class Connection {
  constructor(view, outputSocket, inputSocket) {
    this.view = view;
    this.inputSocket = inputSocket;
    this.outputSocket = outputSocket;

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.zIndex = -1;

    this.render();
  }

  getPoints() {
    const [x1, y1] = this.outputSocket.getPosition();
    const [x2, y2] = this.inputSocket.getPosition();
    return [x1, y1, x2, y2];
  }

  renderPath() {
    const [x1, y1, x2, y2] = this.getPoints();
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }

  update() {
    const path = this.element.querySelector(".connection path.main-path");

    if (!path) throw new Error("Path of connection was broken");

    const d = this.renderPath();
    path.setAttribute("d", d);
  }

  render() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    const classes = [
      `input-${this.inputSocket.nodeView.node.id}`,
      `output-${this.outputSocket.nodeView.node.id}`
    ]

    svg.classList.add("connection", ...classes);
    path.classList.add("main-path");

    svg.appendChild(path);
    this.element.appendChild(svg);
    this.view.area.appendChild(this.element);

    this.update();
  }
}

export default Connection;