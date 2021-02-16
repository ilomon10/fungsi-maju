import { Component, Element } from "../lib";

class Inject extends Component {
  constructor() {
    super("Inject");
    this.element = Element;
  }

  builder(node) {
    node
      .addOutput(0)
      ;
  }

  worker(node, input) {
    return input;
  }
}

export default Inject;