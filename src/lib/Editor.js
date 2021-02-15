import Engine from "./Engine";
import Node from "./Node";

class Editor extends Engine {

  static generateId() {
    const rand = Math.random().toString(36);
    return `${rand.substr(2, 4)}_${rand.substr(4, 4)}`;
  };

  constructor(version) {
    super(version);
    this.nodes = [];
  }

  addNode(node) {
    if (!node instanceof Node) return node;

    if (!this.components.hasOwnProperty(node.type))
      throw new Error(`Component ${node.type} not registered`);

    node = this.components[node.type].builder(node);

    this.nodes.push(node);

    return node;
  }

  removeNode(id) {
    return this.nodes.filter(node => node.id !== id);
  }

  toJSON() {
    const data = {
      version: this.version,
      nodes: this.nodes.map((node) => node.toJSON())
    };
    return data;
  }
}

export default Editor;