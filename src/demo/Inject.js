import { Component } from "../lib";
import Node from "./Node";

class Inject extends Component {
  constructor() {
    super("Inject");
    this.component = Node;
  }

  builder(node) {
    console.log(node);
    node.addOutput(0);
  }

  worker(node, input) {
    return { from: node.id, value: input };
  }
}

export default Inject;