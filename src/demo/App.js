import './css/App.css';
import { Editor, Node } from './../lib';
import Inject from './Inject';
import Switch from './Switch';
import Debug from './Debug';

class App {
  nodes = null;

  constructor() {
    document.addEventListener("DOMContentLoaded", this.onDOMLoaded.bind(this));
    this.container = document.getElementById("editor");

    this.container.style.width = "350px";
    this.container.style.height = "350px";

    this.editor = new Editor("0.1.0", this.container);
    this.editor.register(new Inject());
    this.editor.register(new Switch());
    this.editor.register(new Debug());
  }

  onDOMLoaded() {
    document.getElementById("editor");

    const nodeI = new Node(Editor.generateId(), "Inject");
    const nodeS = new Node(Editor.generateId(), "Switch");
    const nodeD = new Node(Editor.generateId(), "Debug");
    const nodeD2 = new Node(Editor.generateId(), "Debug");

    nodeI.position = [10, 0];
    nodeS.position = [60, 50];
    nodeD.position = [120, 100];
    nodeD2.position = [120, 150];

    this.editor.addNode(nodeI);
    this.editor.addNode(nodeS);
    this.editor.addNode(nodeD);
    this.editor.addNode(nodeD2);

    this.editor.connect(nodeI, 0, nodeS);
    this.editor.connect(nodeS, 0, nodeD);
    this.editor.connect(nodeS, 1, nodeD2);
    
    console.log(this.editor);
  }

  run(input, startId) {
    this.editor.process(input, startId);
  }
}

export default App;
