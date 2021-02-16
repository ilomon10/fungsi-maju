import App from './../App';

let spy;

beforeAll(() => {
  spy = jest.spyOn(document, "getElementById");
})

describe("Demo app", () => {
  let mockElement;
  beforeAll(() => {
    mockElement = document.createElement("div");
  })

  it("Render aman", () => {
    spy.mockReturnValue(mockElement);
    new App();
  });
});