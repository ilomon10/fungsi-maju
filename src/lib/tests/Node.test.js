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

  it("add output", () => {
    node.addOutput(0, node2.id);

    expect(node.outputs[0]).toContain(node2.id);
  })
  it("remove output", () => {
    node.removeOutput(node2.id);
    
    expect(node.outputs[0]).toEqual([]);
  })
})