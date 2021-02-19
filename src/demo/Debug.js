import { Component } from "../lib";

class Debug extends Component {
  constructor() {
    super("Debug");
  }

  builder(node) {
    node.addSocket("input", 0, "Value");
    console.log(node.sockets);
  }

  worker(node, input) {
    return null;
  }
}

export default Debug;