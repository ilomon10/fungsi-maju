import Engine from "../Engine";
import Component from "../Component";

describe("Engine", () => {
  let engine;
  let component;

  it("render aman", () => {
    engine = new Engine("0.1.0");

    expect(engine).toBeInstanceOf(Engine);
    expect(engine).toHaveProperty("register");
    expect(engine).toHaveProperty("process");
    expect(engine).toHaveProperty("version");
    expect(engine.version).toEqual("0.1.0");
  });

  it("registrasi komponen", () => {
    class BasicComponent extends Component {
      constructor() {
        super("Basic");
      }
      worker(node, input) {
        return input + 1;
      }
    }
    component = new BasicComponent();

    engine.register(component);

    expect(engine.components[component.name]).toBeInstanceOf(Component);
    expect(component).toHaveProperty("engine");
    expect(component.engine).toEqual(engine);
  });

  it("proses dengan skema valid", () => {
    const json = {
      "version": "0.1.0",
      "nodes": [{
        "id": 1,
        "type": "Basic",
        "outputs": [[2], [3]]
      }, {
        "id": 2,
        "type": "Basic",
        "outputs": [[3]]
      }, {
        "id": 3,
        "type": "Basic",
        "outputs": []
      }]
    };
    expect(engine.process(1, 1, json)).toEqual(true);
  });

  it("proses dengan skema pengulangan", () => {
    const json = {
      "version": "0.1.0",
      "nodes": [{
        "id": 1,
        "type": "Basic",
        "outputs": [[2]]
      }, {
        "id": 2,
        "type": "Basic",
        "outputs": [[3]]
      }, {
        "id": 3,
        "type": "Basic",
        "outputs": [[1]]
      }]
    };
    const process = () => engine.process(1, 2, json);
    expect(process).toThrow("Recursion detected");
  });

});