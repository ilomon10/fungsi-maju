import Recursion from "../Recursion";

describe("Recursion", () => {
  const json = {
    "version": "0.1.0",
    "nodes": [{
      "id": 1,
      "type": "Basic",
      "outputs": [2]
    }, {
      "id": 2,
      "type": "Basic",
      "outputs": [3, 4]
    }, {
      "id": 3,
      "type": "Basic",
      "outputs": [1]
    }, {
      "id": 4,
      "type": "Basic",
      "outputs": [5, 3]
    }, {
      "id": 5,
      "type": "Basic",
      "outputs": [3]
    }]
  }
  it("renders without crashing", () => {
    new Recursion();
  })

  it("detect", () => {
    const recursion = new Recursion(json.nodes);
    expect(recursion.detect()).toEqual({
      "id": 3,
      "type": "Basic",
      "outputs": [2]
    });
  })
})