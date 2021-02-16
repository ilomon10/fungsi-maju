import { createElement } from "react";
import ReactDOM from "react-dom";

import '../css/View.css';

import Drag from "./Drag";
import Socket from "./Socket";

class Node {

  constructor(node, component, view) {
    this.view = view;
    this.node = node;

    this.sockets = {};

    this.component = component;
    this.element = document.createElement("div");
    this.element.style.position = "absolute";

    this.element.className = "node-wrapper";

    this._drag = new Drag(
      this.element,
      this.onTranslate.bind(this),
      this.onStart.bind(this),
    );

    this.update();
    this.render();
  }

  onStart(e) {
    this.view.selectNode(this.node);
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

    node.position[0] = params.x;
    node.position[1] = params.y;

    this.update();
  }

  bindSocket(element, type, id) {
    this.sockets[`${type}-${id}`] = new Socket(element, type, this);
  }

  update() {
    let [x, y] = [0, 0];
    if (this.node.position) [x, y] = this.node.position;
    this.element.style.transform = `translate(${x}px, ${y}px)`;
    this.node.position = [x, y];

    this.view.rerenderNode();
  }

  render() {
    ReactDOM.render(createElement(this.component.element, {
      node: this.node,
      view: this.view,
      bindSocket: this.bindSocket.bind(this)
    }), this.element);
  }
}

export default Node;