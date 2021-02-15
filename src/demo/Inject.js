import Component from "../lib/Component";

class Inject extends Component {
  constructor() {
    super("Inject");
  }

  worker(node, input) {
    return input;
  }
}

export default Inject;