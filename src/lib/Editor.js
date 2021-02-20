import Engine from "./Engine";
import Node from "./Node";
import View from "./View";

class Editor extends Engine {
  view = null;

  static generateId() {
    const rand = Math.random().toString(36);
    return `${rand.substr(2, 4)}_${rand.substr(4, 4)}`;
  };

  constructor(version, container) {
    super(version);
    this.nodes = [];

    if (container) this.view = new View(container, this.components, this);
  }

  addNode(node) {
    this.emit("nodecreate", node);

    if (!node instanceof Node) return node;

    if (!this.components.hasOwnProperty(node.type))
      throw new Error(`Component ${node.type} not registered`);

    this.nodes.push(node);

    this.emit("nodecreated", node, this.components[node.type]);

    return node;
  }

  removeNode(id) {
    if (Array.isArray(id)) {
      return id.map((i) => {
        return this.removeNode(i);
      })
    }

    this.emit("noderemove", this.nodes);

    const index = this.nodes.findIndex(node => node.id === id);

    if (index === -1) throw new Error(`Node ${id} not found`);

    const nodes = this.nodes.splice(index, 1);

    this.emit("noderemoved", nodes);

    return nodes[0];
  }

  getNode(id) {
    return this.nodes.find((node) => node.id === id);
  }

  connect(from, branch, to) {
    const fromNode = this.nodes.find(node => node.id === from.id);
    if (!fromNode) throw new Error(`Node ${from.id} not found`);

    const toNode = this.nodes.find(node => node.id === to.id);
    if (!toNode) throw new Error(`Node ${to.id} not found`);

    fromNode.addOutput(branch, toNode.id);
    
    console.log(fromNode);

    if (this.view) this.view.addConnection(fromNode, branch, toNode);

    return this;
  }

  toJSON() {
    const data = {
      version: this.version,
      nodes: this.nodes.map((node) => node.toJSON())
    };
    return data;
  }

  fromJSON(data) {
    if (!this.validate(data)) return false;

    const nodes = [...this.nodes];
    nodes.forEach((node) => {
      this.removeNode(node.id);
    });

    data.nodes
      .map((node) => {
        return this.addNode(new Node(node.id, node.type, node.outputs));
      }).forEach((node) => {
        node.outputs.forEach((output, branch) => {
          output.forEach((nodeId) => {
            const toNode = this.getNode(nodeId);
            this.connect(node, branch, toNode);
          })
        })
      });

    return true;
  }
}

export default Editor;