import Node from "../Node";

describe("Node", () => {
  let node;
  let node2;

  it("render aman", () => {
    node = new Node(1, "test");
    node2 = new Node(2, "test");

    expect(node).toHaveProperty("id");
    expect(node).toHaveProperty("type");
    expect(node).toHaveProperty("outputs");

    expect(node.id).toBe(1);
    expect(node.type).toBe("test");
    expect(node.outputs).toEqual([]);
  })

  it("set metadata", () => {
    const json = node.setData("key", "value");;
    expect(json).toEqual({ "key": "value" });
    expect(node.metadata).toEqual({ "key": "value" });
    expect(node.metadata["key"]).toEqual("value");
    expect(node.getData("key")).toEqual("value");
  })

  it("get metadata", () => {
    expect(node.getData("key")).toEqual("value");
    expect(node.metadata["key"]).toEqual("value");
  })

  it("remove metadata", () => {
    const json = node.removeData("key");
    expect(json).toEqual({});
    expect(node.metadata).toEqual({});
    expect(node.getData("key")).toEqual(undefined);
  })

  it("export to json", () => {
    const json = node.toJSON();
    expect(json).toEqual({
      "id": 1,
      "metadata": {},
      "outputs": [],
      "type": "test"
    });
  })

  it("add output", () => {
    node.addOutput(0, node2.id);
    expect(node.outputs[0]).toContain(node2.id);
  })

  it("add exist output", () => {
    node.addOutput(0, node2.id);

    const isArrayUnique = arr => Array.isArray(arr) && new Set(arr).size === arr.length;

    expect(node.outputs[0]).toContain(node2.id);
    expect(isArrayUnique(node.outputs[0])).toBeTruthy();
  })

  it("remove output", () => {
    node.removeOutput(node2.id);
    expect(node.outputs[0]).toEqual([]);
  })
})