import App from './../App';

it("Render aman", () => {
  new App();
});

it("Proses", () => {
  const json = {
    "version": "0.1.1",
    "nodes": [{
      "id": 1,
      "type": "Inject",
      "outputs": [[2]]
    }, {
      "id": 2,
      "type": "Switch",
      "outputs": [[3], [4]]
    }, {
      "id": 3,
      "type": "Debug",
      "outputs": []
    }, {
      "id": 4,
      "type": "Debug",
      "outputs": []
    }]
  }
  const app = new App();
  app.nodes = json.nodes;
  app.run(6, 1);
});