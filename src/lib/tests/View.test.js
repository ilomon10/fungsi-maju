import Component from "../Component";
import Editor from "../Editor";
import Node from "../Node";

describe("Editor dengan View", () => {
  let version = "0.1.0";
  let editor;

  class BasicComponent extends Component {
    constructor() {
      super("Basic");
    }
    builder(nodeView) {
      nodeView.addSocket("input", 0, "Value");
      nodeView.addSocket("output", 0, "Value");
      nodeView.addSocket("output", 1, "Value");
      return nodeView;
    }
    worker(node, input) {
      return input;
    }
  }

  it("render aman", () => {
    const component = new BasicComponent();

    const container = document.createElement("div");

    editor = new Editor(version, container);
    editor.register(component);

    expect(editor.version).toBe(version);
    expect(typeof Editor.generateId()).toBe("string");
    expect(editor.components).toHaveProperty(component.name);
  })

  it("tambah node baru", () => {
    const node = new Node(Editor.generateId(), "Basic");
    const node2 = new Node(Editor.generateId(), "Basic");

    editor.addNode(node);
    editor.addNode(node2);

    editor.connect(node, 0, node2);

    const json = editor.toJSON();

    expect(json).toEqual({
      version: version,
      nodes: [{
        id: node.id,
        type: "Basic",
        outputs: [[node2.id], []]
      }, {
        id: node2.id,
        type: "Basic",
        outputs: [[], []]
      }]
    });

    editor.process(0, node.id);
  })

})