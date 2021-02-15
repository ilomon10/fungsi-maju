import Node from "../Node";

describe("Node", () => {
  let node;

  it("render aman", () => {
    node = new Node(1, "test");

    expect(node).toHaveProperty("id");
    expect(node).toHaveProperty("type");
    expect(node).toHaveProperty("outputs");

    expect(node.id).toBe(1);
    expect(node.type).toBe("test");
    expect(node.outputs).toEqual([]);
  })

  it("add output", () => {
    node.addOutput(0);

    const node2 = new Node(2, "test");

    node.connect(0, node2.id);

    expect(node.outputs[0]).toContain(node2.id);
  })
})