import { Component } from "../lib";
import Node from "./Node";

class Debug extends Component {
  constructor() {
    super("Debug");
    this.component = Node;
  }

  builder(node) {
    node.hasInput = true;
  }

  worker(node, input) {
    console.log(node.id, input);
    return null;
  }
}

export default Debug;