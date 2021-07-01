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

    this.nodeView.view.emitter.emit("rendersocket", {
      el: element,
      nodeview: nodeView,
      socket: this
    })
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
    this.nodeView.view.container.dispatchEvent(new PointerEvent("mousemove", e));
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

  removeConnection(connection = null) {
    if (connection === null) {
      return this.connection.map(conn => {
        this.removeConnection(conn).destroy();
        return conn;
      });
    } else {
      const index = this.connection.indexOf(connection);
      const conn = this.connection.splice(index, 1);
      return conn[0];
    }
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

  destroy() {
    this.removeConnection();
  }
}

export default Socket;