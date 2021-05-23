import { NodeView, Component, Editor, Node } from "..";

describe("Editor dengan View", () => {
  let version = "0.1.0";
  let editor;

  const nodes = [
    new Node(Editor.generateId(), "Basic"),
    new Node(Editor.generateId(), "Basic")
  ]

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
    expect(editor.view.container).toBeInstanceOf(HTMLDivElement);
  })

  it("verify method", () => {
    const view = editor.view;
    expect(typeof view.addNode).toMatch("function");
    expect(typeof view.selectNode).toMatch("function");
    expect(typeof view.removeNode).toMatch("function");
    expect(typeof view.getNode).toMatch("function");
    expect(typeof view.removeConnection).toMatch("function");
    expect(typeof view.connect).toMatch("function");
  })

  it("tambah node baru", () => {
    editor.addNode(nodes[0]);
    editor.addNode(nodes[1]);

    editor.connect(nodes[0], 0, nodes[1]);

    const json = editor.toJSON();

    expect(json).toEqual({
      version: version,
      nodes: [{
        id: nodes[0].id,
        metadata: {},
        type: "Basic",
        outputs: [[nodes[1].id], []]
      }, {
        id: nodes[1].id,
        metadata: {},
        type: "Basic",
        outputs: [[], []]
      }]
    });
  })

  it("get node", () => {
    const nodeView = [
      editor.view.getNode(nodes[0].id),
      editor.view.getNode(nodes[1].id)
    ]

    nodeView.forEach((nv) => {
      expect(nv).toBeInstanceOf(NodeView);
      expect(nv.node).toBeInstanceOf(Node);
    });
  })

  it("remove node", () => {
    editor.removeNode(nodes[0]);

    let json = editor.toJSON();
    expect(json).toEqual({
      version: version,
      nodes: [{
        id: nodes[1].id,
        metadata: {},
        type: "Basic",
        outputs: [[], []]
      }]
    });

    editor.addNode(nodes[0]);

    json = editor.toJSON();
    expect(json).toEqual({
      version: version,
      nodes: [{
        id: nodes[1].id,
        metadata: {},
        type: "Basic",
        outputs: [[], []]
      }, {
        id: nodes[0].id,
        metadata: {},
        type: "Basic",
        outputs: [[], []]
      }]
    });

    editor.removeNode(nodes[0]);
    editor.removeNode(nodes[1]);

    json = editor.toJSON();
    expect(json).toEqual({
      version: version,
      nodes: []
    });
  })

})