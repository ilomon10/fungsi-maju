import '../css/View.css';

import Drag from "./Drag";
import Socket from "./Socket";
import Element from "./Element";

class Node {

  constructor(node, component, view) {
    this.view = view;
    this.node = node;

    this.sockets = {};

    this.component = component;
    this.container = document.createElement("div");
    this.container.style.position = "absolute";

    this.container.className = "node-wrapper";

    this.element = new Element(this, this.component.name);

    this._drag = new Drag(
      this.container,
      this.onTranslate.bind(this),
      this.onStart.bind(this),
    );

    this.update();
    this.render();
  }

  get id() {
    return this.node.id;
  }

  getElement() {
    return this.element.element;
  }

  addSocket(type, key, name) {
    const socket = this.element.addSocket(type, key, name);
    this.sockets[`${type}-${key}`] = new Socket(socket.element, key, type, this);

    this.update();
  }

  getSocket(type, key) {
    return this.sockets[`${type}-${key}`];
  }

  onStart(_e) {
    this.view.selectNode(this, _e.ctrlKey);
    this._startPosition = [...this.node.position];
  }

  onTranslate(dx, dy) {
    const x = this._startPosition[0] + dx;
    const y = this._startPosition[1] + dy;
    this.translate(x, y);
  }

  onDrag(dx, dy) {
    const x = this._startPosition[0] + dx;
    const y = this._startPosition[1] + dy;
    this.translate(x, y);
  }

  translate(x, y) {
    const node = this.node;
    const params = { node, x, y };
    const grid = 5;

    node.position[0] = Math.floor(params.x / grid) * grid;
    node.position[1] = Math.floor(params.y / grid) * grid;

    this.update();
  }

  update() {
    let [x, y] = [0, 0];
    if (this.node.position) [x, y] = this.node.position;
    this.container.style.transform = `translate(${x}px, ${y}px)`;
    this.node.position = [x, y];
    this.view.rerenderNode();
  }

  render() {
    const el = this.element.render(this.view, this.node);
    this.container.appendChild(el);
  }

  destroy() {

  }
}

export default Node;