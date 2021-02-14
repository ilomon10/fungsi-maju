import Engine from "../App";
import Component from "../Component";

describe("Engine", () => {
  let engine;
  let component;

  it("renders without crashing", () => {
    engine = new Engine("0.1.0");
  });

  it("register component", () => {
    class BasicComponent extends Component {
      name = "Basic";
      worker(node, inputs) {
        return true;
      }
    }
    component = new BasicComponent();

    engine.register(component);

    expect(engine.components[component.name]).toBeInstanceOf(Component);
  });

  it("process", () => {
    const json = {
      "version": "0.1.0",
      "nodes": [{
        "id": 1,
        "type": "Basic",
        "outputs": [2]
      }, {
        "id": 2,
        "type": "Basic",
        "outputs": [3, 4]
      }, {
        "id": 3,
        "type": "Basic",
        "outputs": []
      }, {
        "id": 4,
        "type": "Basic",
        "outputs": [3, 5]
      }, {
        "id": 5,
        "type": "Basic",
        "outputs": [3]
      }]
    }

    expect(engine.process(json, 1)).toReturn(true);
  });

});