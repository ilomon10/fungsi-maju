import './css/App.css';
import { Editor, Node } from './../lib';
import Inject from './Inject';
import Switch from './Switch';
import Debug from './Debug';
import React, { Component, createRef } from 'react';

class App extends Component {
  nodes = null;

  container = createRef();

  componentDidMount() {
    console.log(this.container);
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

    console.log(nodeI);

    nodeI.position = [10, 0];
    nodeS.position = [60, 50];
    nodeD.position = [120, 100];
    nodeD2.position = [120, 150];

    this.editor.addNode(nodeI);
    this.editor.addNode(nodeS);
    this.editor.addNode(nodeD);
    this.editor.addNode(nodeD2);

    setTimeout(() => {
      this.editor.connect(nodeI, 0, nodeS);
      this.editor.connect(nodeS, 1, nodeD);
    }, 10);


    // this.editor.process(input, startId);
  }

  render() {
    return (
      <div id="editor" ref={this.container}></div>
    )
  }
}

export default App;
