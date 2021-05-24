class Connection {

  static defaultPath(points) {
    const [x1, y1, x2, y2] = points;
    let dx1 = ((x1 + x2) / 2);
    dx1 = dx1 - (dx1 - x1);
    const dy1 = (y1 + y2) / 2;
    let dx2 = (x1 + x2) / 2;
    dx2 = dx2 + (dx2 - x1);
    const dy2 = (y1 + y2) / 2;
    return `M ${x1} ${y1} C ${dx1} ${dy1} ${dx2} ${dy2} ${x2} ${y2}`;
  }

  static renderPathData(points) {
    return Connection.defaultPath(points);
  }

  static updateConnection(element, data, path = null) {
    if (!path) path = element.querySelector(".connection path.main-path");

    if (!path) throw new Error("Path of connection was broken");

    path.setAttribute("d", data);
  }

  static renderConnection(element, data, connection) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    const classes = !connection ? [] : [
      `input-${connection.inputId}`,
      `output-${connection.outputId}`
    ];

    if (classes.length > 0) svg.classList.add("connection", ...classes);
    else svg.classList.add("connection");
    path.classList.add("main-path");

    path.style.pointerEvents = "all";

    path.setAttribute("d", data);

    svg.appendChild(path);
    element.appendChild(svg);
    return path;
  }

  constructor(view, outputSocket, inputSocket, emitter) {
    this.view = view;
    this.inputSocket = inputSocket;
    this.outputSocket = outputSocket;
    this.emitter = emitter;

    this.inputSocket.addConnection(this);
    this.outputSocket.addConnection(this);

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.zIndex = -1;
    this.element.style.pointerEvents = "none";

    this.keyup = this.keyup.bind(this);

    this._path = null;

    this.view.area.appendChild(this.element);

    this.render();
    this.emitter.emit("connectioncreated", this);
    this.emitter.on("connectionselected", (self) => {
      if (self !== this) return;
      const vm = this;
      window.addEventListener("click", function listener(e) {
        window.removeEventListener("click", listener);
        vm.click(e);
      });
    })
  }

  getPoints() {
    const [x1, y1] = this.outputSocket.getPosition();
    const [x2, y2] = this.inputSocket.getPosition();
    return [x1, y1, x2, y2];
  }

  update() {
    const d = Connection.renderPathData(this.getPoints());
    Connection.updateConnection(this.element, d, this._path);
  }

  render() {
    const d = Connection.renderPathData(this.getPoints());
    this._path = Connection.renderConnection(
      this.element, d,
      {
        inputId: this.inputSocket.nodeView.node.id,
        outputId: this.outputSocket.nodeView.node.id
      }
    );

    this._path.removeEventListener("click", this.click.bind(this));
    this._path.addEventListener("click", this.click.bind(this));
  }

  click(e) {
    const classList = this._path.classList;
    window.removeEventListener("keyup", this.keyup);
    if (!classList.contains("active")) {
      e.stopPropagation();
      window.addEventListener("keyup", this.keyup);
      this.emitter.emit("connectionselected", this);
    }
    classList.toggle("active");
  }

  keyup(e) {
    if (e.code === "Delete" || e.code === "Backspace") {
      this.destroy();
    }
  }

  destroy() {
    window.removeEventListener("keyup", this.keyup);
    this.inputSocket.removeConnection(this);
    this.outputSocket.removeConnection(this);
    this.view.removeConnection(this);
    this.emitter.emit("connectionremoved", this);
  }
}

export default Connection;