import { Component } from "../lib";

class Switch extends Component {
  constructor() {
    super("Switch");
  }

  builder(node) {
    node.addSocket("input", 0, "Value");
    node.addSocket("output", 0, "Value");
    node.addSocket("output", 1, "Value");
  }

  worker(node, input) {
    return [input < 5 ? input : undefined, input >= 5 ? input : undefined];
  }
}

export default Switch;