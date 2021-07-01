import Editor from "./Editor";
import Node from "./Node";

class Component {
  name = null;
  engine = null;
  constructor(name) {
    this.name = name;
  }

  build(node) {
    this.builder(node);
    return node;
  }

  createNode(metadata = {}) {
    const node = new Node(Editor.generateId(), this.name);
    node.metadata = metadata;
    this.build(node);
    return node;
  }
}

export default Component;