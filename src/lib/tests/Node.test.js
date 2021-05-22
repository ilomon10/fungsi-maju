import Node from "../Node";

describe("Node", () => {
  let node;
  let node2;

  it("render aman", () => {
    node = new Node(1, "test");
    node2 = new Node(2, "test");

    node.metadata.set("key", "value");

    expect(node).toHaveProperty("id");
    expect(node).toHaveProperty("type");
    expect(node).toHaveProperty("outputs");

    expect(node.id).toBe(1);
    expect(node.type).toBe("test");
    expect(node.outputs).toEqual([]);
  })

  it("export to json", () => {
    const json = node.toJSON();
    expect(json).toEqual({
      "id": 1,
      "metadata": { "key": "value" },
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