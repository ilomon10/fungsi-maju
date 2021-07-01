import './css/App.css';
import ReactDOM from "react-dom";
import { Editor, Node } from './../lib';
import Inject from './Inject';
import Switch from './Switch';
import Debug from './Debug';
import React, { Component, createRef } from 'react';

class App extends Component {
  nodes = null;

  container = createRef();

  state = {
    json: {}
  }

  componentDidMount() {

    this.container.current.style.width = "350px";
    this.container.current.style.height = "350px";

    this.editor = new Editor("0.1.0", this.container.current);

    this.editor.on("rendernode", ({ el, node, nodeview, component, bindSocket }) => {
      const Component = component.component;
      node.update = () => new Promise((res) => {
        ReactDOM.render(<Component
          node={node}
          nodeview={nodeview}
          component={component}
          editor={this.editor}
          bindSocket={bindSocket}
        />, el, res);
      })
      node._reactComponent = true;
      node.update();
    })

    this.editor.on("connectioncreated", (connection) => {
      console.log("connectioncreated", connection);
    })

    const injectComp = new Inject();
    const switchComp = new Switch();
    const debugComp = new Debug();

    this.editor.register(injectComp);
    this.editor.register(switchComp);
    this.editor.register(debugComp);

    const nodeI = injectComp.createNode();
    const nodeI2 = injectComp.createNode();
    const nodeS = switchComp.createNode();
    const nodeD = debugComp.createNode();
    const nodeD2 = debugComp.createNode();

    nodeI.position = [10, 0];
    nodeI2.position = [100, 0];
    nodeS.position = [10, 100];
    nodeD.position = [10, 200];
    nodeD2.position = [120, 200];

    this.editor.addNode(nodeI);
    this.editor.addNode(nodeI2);
    this.editor.addNode(nodeS);
    this.editor.addNode(nodeD);
    this.editor.addNode(nodeD2);

    this.editor.connect(nodeI, 0, nodeS);
    this.editor.connect(nodeI2, 0, nodeS);
    this.editor.connect(nodeS, 0, nodeD);
    this.editor.connect(nodeS, 1, nodeD2);

    setTimeout(() => {
      this.editor.connect(nodeI, 0, nodeS);
    }, 1000);

    const updateJSON = () => {
      this.setState({ json: this.editor.toJSON(true) });
    }
    this.editor.on("process", updateJSON);
    this.editor.on("noderemoved", updateJSON);
    this.editor.on("connectioncreated", updateJSON);
    this.editor.on("connectionremoved", updateJSON);
    this.editor.on("nodetranslated", updateJSON);
    this.editor.on("contextmenu", ({ e, node }) => {
      e.preventDefault();
      e.stopPropagation();
      console.log(e, node);
    })

    updateJSON();
  }

  render() {
    return (
      <div>
        <div id="editor" ref={this.container}></div>
        <div id="json">{JSON.stringify(this.state.json)}</div>
      </div>
    )
  }
}

export default App;
