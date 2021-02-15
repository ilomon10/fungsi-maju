import Recursion from "../Recursion";

describe("Recursion", () => {
  it("renders without crashing", () => {
    new Recursion();
  })

  it("detect", () => {
    const recursion = new Recursion([{
      "id": 1,
      "type": "Basic",
      "outputs": [[2], [3]]
    }, {
      "id": 2,
      "type": "Basic",
      "outputs": [[3]]
    }, {
      "id": 3,
      "type": "Basic",
      "outputs": [[1]]
    }]);
    expect(recursion.detect()).toEqual({
      "id": 1,
      "type": "Basic",
      "outputs": [[2], [3]]
    });
  })
})