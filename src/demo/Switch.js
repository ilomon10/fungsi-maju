import { Component, Element } from "../lib";

class Switch extends Component {
  constructor() {
    super("Switch");
    this.element = Element;
  }

  builder(node) {
    node
      .addOutput(0)
      .addOutput(1)
      ;
  }
  
  worker(node, input) {
    return [input < 5 ? input : undefined, input >= 5 ? input : undefined];
  }
}

export default Switch;