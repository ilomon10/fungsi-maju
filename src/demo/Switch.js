import { Component } from "../lib";
import Node from "./Node";

class Switch extends Component {
  constructor() {
    super("Switch");
    this.component = Node;
  }

  builder(node) {
    node.hasInput = true;
    node.addOutput(0);
    node.addOutput(1);
  }

  worker(node, input) {
    const inp = input;
    const value = input.value;
    node.setData(inp.from, inp.value);
    return [value < 5 ? value : undefined, value >= 5 ? value : undefined];
  }
}

export default Switch;