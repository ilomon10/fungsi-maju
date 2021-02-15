import Component from "../Component";
import Editor from "../Editor";
import Node from "../Node";

describe("Editor", () => {
  let version = "0.1.0";
  let editor;

  class BasicComponent extends Component {
    constructor() {
      super("Basic");
    }
    builder(node) {
      return node
        .addOutput(0)
        .addOutput(1);
    }
    worker(node, input) {
      return input;
    }
  }

  it("render aman", () => {
    const component = new BasicComponent();

    editor = new Editor(version);
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

    node.connect(0, node2.id);

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