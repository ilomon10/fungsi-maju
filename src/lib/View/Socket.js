class Socket {
  constructor(element, branch, type, nodeView) {
    this.element = element;
    this.branch = branch;
    this.type = type;
    this.nodeView = nodeView;

    this.connection = [];

    this.element.removeEventListener("pointerdown", this.pointerdown.bind(this))
    this.element.addEventListener("pointerdown", this.pointerdown.bind(this));

    this._pick = false;
  }

  action(socket) {
    const { picker } = this.nodeView.view;
    if (!socket) {
      picker.reset();
      return false;
    }
    if (socket.type === "input")
      picker.pickInput(this);
    else if (socket.type === "output") {
      picker.pickOutput(this);
    }
  }

  pointerdown(e) {
    console.log("socket");
    this.nodeView.view.container.dispatchEvent(new PointerEvent("mousemove", e));
    this.nodeView.view.container.dispatchEvent(new PointerEvent("pointerdown", e));
    this.action(this);
    e.preventDefault();
    e.stopPropagation();
  }

  hasConnection(socket) {
    const exist = this.connection
      .find(conn => (
        conn.inputSocket === socket || conn.outputSocket === socket
      ))
    return socket
      ? !!exist
      : this.connection.length > 0
      ;
  }

  addConnection(connection) {
    this.connection.push(connection);
  }
  removeConnection(connection) {
    this.connection.splice(this.connection.indexOf(connection), 1);
  }

  getPosition() {
    const el = this.element;
    const { node } = this.nodeView;
    const center = {
      x: el.offsetWidth / 2,
      y: el.offsetHeight / 2,
    }
    return [
      node.position[0] + el.offsetLeft + center.x,
      node.position[1] + el.offsetTop + center.y
    ]
  }
}

export default Socket;