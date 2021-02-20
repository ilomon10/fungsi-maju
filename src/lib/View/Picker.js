import Connection from "./Connection";

class Picker {
  constructor(view) {
    this.view = view;

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.classList.add("node-picker");
    this.view.area.appendChild(this.element);

    this._socket = null;

    this.view.container.addEventListener("pointermove", () => (
      this.socket && this.updateConnection(this.socket)
    ))

    this.pointerup = this.pointerup.bind(this);

    window.removeEventListener("pointerup", this.pointerup);
    window.addEventListener("pointerup", this.pointerup);
  }

  get socket() {
    return this._socket;
  }

  set socket(socket) {
    this._socket = socket;
    this.updatePseudoConnection(socket);
    return socket;
  }

  reset() {
    this.socket = null;
  }

  pointerup(event) {
    const endEl = document.elementFromPoint(event.clientX, event.clientY);
    if (!this.view.container.contains(endEl)) {
      this.reset();
      return false;
    }

    const sockets = this.view.getSockets();
    const socket = sockets.find(socket => socket.element === endEl);

    if (!this.socket || !socket) {
      this.reset();
      return false;
    }
    if (socket) socket.action(socket);
  }

  pickOutput(socket) {
    if (this.socket === null && socket) {
      this.socket = socket;
      return true;
    }

    if (this.socket.type === "input") {
      if (
        !this.socket.hasConnection(socket)
        && this.socket.nodeView !== socket.nodeView
      ) {
        this.view.connect(socket, this.socket);
      }
      this.reset();
      return true;
    }

    if (socket) this.socket = socket;
  }

  pickInput(socket) {
    if (this.socket === null) {
      this.socket = socket;
      return true;
    }

    if (this.socket.type === "output") {
      if (
        !this.socket.hasConnection(socket)
        && this.socket.nodeView !== socket.nodeView
      ) {
        this.view.connect(this.socket, socket);
      }
      this.reset();
      return true;
    }
    if (socket) this.socket = socket;
  }

  getPoints(socket) {
    const mouse = this.view.area.mouse;
    const [x1, y1] = socket.getPosition();
    return socket.type === "output"
      ? [x1, y1, mouse.x, mouse.y]
      : [mouse.x, mouse.y, x1, y1]
      ;
  }

  updatePseudoConnection(socket) {
    if (socket !== null) {
      this.renderConnection(socket);
    } else {
      this.element.innerHTML = "";
    }
  }

  updateConnection(socket) {
    const d = Connection.renderPathData(this.getPoints(socket));
    Connection.updateConnection(this.element, d);
  }

  renderConnection(socket) {
    const d = Connection.renderPathData(this.getPoints(socket));
    Connection.renderConnection(this.element, d);
  }

}

export default Picker;