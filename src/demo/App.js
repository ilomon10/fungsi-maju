import './css/App.css';
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
    this.editor.register(new Inject());
    this.editor.register(new Switch());
    this.editor.register(new Debug());

    const nodeI = new Node(Editor.generateId(), "Inject");
    const nodeS = new Node(Editor.generateId(), "Switch");
    const nodeD = new Node(Editor.generateId(), "Debug");
    const nodeD2 = new Node(Editor.generateId(), "Debug");

    nodeI.position = [10, 0];
    nodeS.position = [10, 100];
    nodeD.position = [10, 200];
    nodeD2.position = [120, 200];

    this.editor.addNode(nodeI);
    this.editor.addNode(nodeS);
    this.editor.addNode(nodeD);
    this.editor.addNode(nodeD2);

    this.editor.connect(nodeI, 0, nodeS);
    this.editor.connect(nodeS, 0, nodeD);

    const updateJSON = () => {
      this.setState({ json: this.editor.toJSON() });
    }
    this.editor.on("process", updateJSON);
    this.editor.on("noderemoved", updateJSON);
    this.editor.on("connectioncreated", updateJSON);
    this.editor.on("connectionremoved", updateJSON);
    this.editor.process(1, nodeI.id);
    
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
