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
    const inp = input;
    const value = input.value;
    node.setData(inp.from, inp.value);
    return [value < 5 ? value : undefined, value >= 5 ? value : undefined];
  }
}

export default Switch;