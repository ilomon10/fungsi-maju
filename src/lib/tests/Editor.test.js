import Component from "../Component";
import Editor from "../Editor";
import Node from "../Node";

let spy;

beforeAll(() => {
  spy = jest.spyOn(document, "getElementById");
})

describe("Editor", () => {
  let version = "0.1.0";
  let editor;

  class BasicComponent extends Component {
    constructor() {
      super("Basic");
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

    editor.connect(node, 0, node2);

    const json = editor.toJSON();

    expect(json).toEqual({
      version: version,
      nodes: [{
        id: node.id,
        type: "Basic",
        outputs: [[node2.id]]
      }, {
        id: node2.id,
        type: "Basic",
        outputs: []
      }]
    });

    editor.process(0, node.id);
  });

  it("import dari json", () => {
    const node = [
      Editor.generateId(),
      Editor.generateId()
    ];
    const json = {
      version: "0.1.0",
      nodes: [{
        id: node[0],
        type: "Basic",
        outputs: [[node[1]]]
      }, {
        id: node[1],
        type: "Basic",
        outputs: []
      }]
    };

    editor.fromJSON(json);

    expect(editor.nodes.length).toBe(2);
    expect(editor.nodes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: node[0],
          type: "Basic",
          outputs: [[node[1]]]
        }),
        expect.objectContaining({
          id: node[1],
          type: "Basic",
          outputs: []
        })
      ]));

  })

})