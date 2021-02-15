import Component from "../Component";

describe("Component", () => {
  it("render aman", () => {
    new Component();
  })

  it("komponen custom", () => {
    class CustomComponent extends Component {
      constructor() {
        super("Custom");
      }
      worker(node, inputs) {
        return [];
      }
    };

    const customComponent = new CustomComponent();

    expect(customComponent).toHaveProperty("name");
    expect(customComponent).toHaveProperty("worker");
    expect(customComponent.name).toEqual("Custom");
  })
})