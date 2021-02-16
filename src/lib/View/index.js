import '../css/View.css';
import Area from './Area';
import Connection from './Connection';
import NodeView from './Node';

class View {
  constructor(container, components) {
    this.container = container;
    this.components = components;

    this.container.classList.add("node-editor-container");

    this.container.addEventListener("click", this.click.bind(this));

    this.area = new Area(this.container);
    this.container.appendChild(this.area.element);

    this.connection = {};
    this.selected = {};
    this.nodes = {};
  }

  addNode(node) {
    const component = this.components[node.type];

    if (!component) throw new Error(`Component ${node.name} not found`);

    const nodeView = new NodeView(node, component, this);

    this.nodes[node.id] = nodeView;
    this.area.appendChild(nodeView.element);
  }

  selectNode(node, accumulate) {
    if (node && !this.nodes[node.id])
      throw new Error("Node not exist in list");

    if (!accumulate) this.selected = {};

    if (this.selected[node.id])
      delete this.selected[node.id];
    else
      this.selected[node.id] = node;

    this.rerenderNode();
  }

  addConnection(from, branch, to) {
    const fromNode = this.nodes[from.id];
    const toNode = this.nodes[to.id];
    const fromSocket = fromNode.sockets[`output-${branch}`];
    const toSocket = toNode.sockets[`input-0`];

    this.connection[`${from.id}-${to.id}`] = new Connection(this, fromSocket, toSocket);
  }

  rerenderNode() {
    Object.keys(this.nodes).forEach((key) => {
      this.nodes[key].render();
    });
    Object.keys(this.connection).forEach((key) => {
      this.connection[key].update();
    })
  }

  click(event) {
    let collision = false;
    Object.keys(this.nodes).forEach((key) => {
      if (this.nodes[key].element.contains(event.target)) collision = true;
    });
    if (!collision) {
      this.selected = {};
      this.rerenderNode();
    }
  }
}

export default View;