class Socket {
  constructor(element, type, nodeView) {
    this.element = element;
    this.type = type;
    this.nodeView = nodeView;
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