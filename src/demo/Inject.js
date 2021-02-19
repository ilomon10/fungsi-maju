import { Component } from "../lib";

class Inject extends Component {
  constructor() {
    super("Inject");
  }

  builder(node) {
    node.addSocket("output", 0, "Value");
  }

  worker(node, input) {
    return input;
  }
}

export default Inject;