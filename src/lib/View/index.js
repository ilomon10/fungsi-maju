// import '../css/View.css';
import Area from "./Area";
import Connection from "./Connection";
import NodeView from "./Node";
import Picker from "./Picker";
import Selection from "./Selection";

class View {
  constructor(container, components, emitter) {
    this.emitter = emitter;

    this.container = container;
    this.components = components;
    
    this.container.setAttribute("tabIndex", 0);

    this.container.classList.add("node-editor-container");
    this.container.addEventListener("pointerup", this.click.bind(this));
    this.container.addEventListener("contextmenu", e => this.emitter.emit("contextmenu", { e, view: this }));
    this.container.style.cursor = "crosshair";

    this.keyup = this.keyup.bind(this);

    this.container.removeEventListener("keyup", this.keyup);
    this.container.addEventListener("keyup", this.keyup);

    this.connection = {};
    this.selected = {};
    this.nodes = {};

    this.area = new Area(this.container);
    this.picker = new Picker(this);
    this.selection = new Selection(this);

    this.emitter.on("nodecreated", (node) => {
      this.addNode(node);
    });
    this.emitter.on("noderemove", (node) => {
      this.removeNode(this.nodes[node.id]);
    });
  }

  addNode(node) {
    const component = this.components[node.type];

    if (!component) throw new Error(`Component ${node.name} not found`);

    const nodeView = new NodeView(node, component, this);

    this.nodes[node.id] = nodeView;
    this.area.appendChild(nodeView.container);

    component.builder(nodeView);

    return nodeView;
  }

  selectNode(node, accumulate) {
    if (node && !this.nodes[node.id])
      throw new Error("Node not exist in list");

    if (!accumulate) this.selected = {};

    if (this.selected[node.id])
      delete this.selected[node.id];
    else
      this.selected[node.id] = node;

    this.emitter.emit("nodeselected", node);

    this.rerenderNode();
  }

  removeNode(node) {
    const id = node.id;
    const deletedNode = this.nodes[id].node;
    this.nodes[id].destroy();
    delete this.nodes[id];
    return deletedNode;
  }

  getNode(id) {
    return this.nodes[id];
  }

  addConnection(from, fromBranch, to, toBranch = 0) {
    const fromNode = this.nodes[from.id];
    const toNode = this.nodes[to.id];
    const fromSocket = fromNode.getSocket("output", fromBranch);
    const toSocket = toNode.getSocket("input", toBranch);

    this.connect(fromSocket, toSocket);
  }

  removeConnection(connection) {
    const connKey = Object.keys(this.connection).filter(key => this.connection[key] === connection);
    this.area.removeChild(this.connection[connKey].element);
    const from = connection.outputSocket.nodeView;
    const to = connection.inputSocket.nodeView;
    from.node.removeOutput(to.id);

    delete this.connection[connKey];
  }

  connect(fromSocket, toSocket) {
    const from = fromSocket.nodeView;
    const to = toSocket.nodeView;
    const id = `${from.id}_${fromSocket.branch}-${to.id}_${toSocket.branch}`;
    from.node.addOutput(fromSocket.branch, to.id);
    this.connection[id] = new Connection(this, fromSocket, toSocket, this.emitter);
  }

  getSockets() {
    const sockets = Object.keys(this.nodes)
      .map((key) => this.nodes[key].sockets)
      .map((sockets) => Object.keys(sockets).map(key => sockets[key]))
      .reduce((acc, sockets) => [...acc, ...sockets], []);
    return sockets;
  };

  rerenderNode() {
    Object.keys(this.nodes).forEach((key) => {
      this.nodes[key].render();
    });
    this.updateConnection();
  }

  updateConnection() {
    Object.keys(this.connection).forEach((key) => {
      this.connection[key].update();
    })
  }

  click(event) {
    let collision = false;
    Object.keys(this.nodes).forEach((key) => {
      if (this.nodes[key].getElement().contains(event.target)) collision = true;
    });
    if (!collision) {
      this.selected = {};
      this.rerenderNode();
    }
  }

  keyup(event) {
    if (event.code === "Backspace" || event.code === "Delete") {
      Object.keys(this.selected).forEach((key) => {
        const node = this.selected[key];
        this.emitter.removeNode(node.node);
      })
    }
  }
}

export default View;