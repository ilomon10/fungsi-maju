import { Node, NodeView, Component, Editor, View } from "..";

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
        metadata: {},
        type: "Basic",
        outputs: [[node2.id]]
      }, {
        id: node2.id,
        metadata: {},
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
        metadata: {},
        type: "Basic",
        outputs: [[node[1]]]
      }, {
        id: node[1],
        metadata: { "key": "value" },
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

let spy;

beforeAll(() => {
  spy = jest.spyOn(document, "getElementById");
})

describe("Editor dengan View", () => {
  let version = "0.1.0";
  let editor;
  let mockCanvas;

  beforeAll(() => {
    mockCanvas = document.createElement("div");
    spy.mockReturnValue(mockCanvas);
  });

  class BasicComponent extends Component {
    constructor() {
      super("Basic");
    }
    builder(node) {
      node.addSocket("input", 0, "Value");
      node.addSocket("output", 0, "Value");
    }
    worker(node, input) {
      return input;
    }
  }

  it("render aman", () => {
    const component = new BasicComponent();

    editor = new Editor(version, mockCanvas);
    editor.register(component);

    expect(editor.version).toBe(version);
    expect(typeof Editor.generateId()).toBe("string");
    expect(editor.components).toHaveProperty(component.name);
    expect(editor.view).toBeInstanceOf(View);
    expect(editor.view.container).toBeInstanceOf(HTMLDivElement);
  })

  it("tambah node baru", () => {
    const node = [
      new Node(Editor.generateId(), "Basic"),
      new Node(Editor.generateId(), "Basic")
    ]

    editor.addNode(node[0]);
    editor.addNode(node[1]);

    editor.connect(node[0], 0, node[1]);

    const nodeView = [
      editor.view.getNode(node[0].id),
      editor.view.getNode(node[1].id),
    ];

    nodeView.forEach((nv, idx) => {
      expect(nv).toBeInstanceOf(NodeView);
      expect(nv.view).toBeInstanceOf(View);
      expect(nv.node).toBeInstanceOf(Node);
      expect(node[idx]).toMatchObject({
        id: nv.node.id
      });
    });
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
        metadata: {},
        type: "Basic",
        outputs: [[node[1]]]
      }, {
        id: node[1],
        metadata: { "key": "value" },
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
          outputs: [[]]
        })
      ]));
    expect(editor.nodes[1].toJSON()).toEqual(
      expect.objectContaining({
        id: node[1],
        type: "Basic",
        metadata: { "key": "value" },
        outputs: [[]]
      })
    )
  })
})