import { Component } from "../lib";

class Debug extends Component {
  constructor() {
    super("Debug");
  }

  builder(node) {
    node.addSocket("input", 0, "Value");
  }

  worker(node, input) {
    console.log(node.id, input);
    return null;
  }
}

export default Debug;