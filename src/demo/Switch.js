import Component from "../lib/Component";

class Switch extends Component {
  constructor() {
    super("Switch");
  }

  worker(node, input) {
    return [input < 5 ? input : undefined, input >= 5 ? input : undefined];
  }
}

export default Switch;