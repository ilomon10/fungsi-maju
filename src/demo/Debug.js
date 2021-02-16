import { Component, Element } from "../lib";

class Debug extends Component {
  constructor() {
    super("Debug");
    this.element = Element;
  }

  builder() { }

  worker(node, input) {
    return null;
  }
}

export default Debug;