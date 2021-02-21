import Drag from "./Drag";

class Selection {
  constructor(view) {
    this.view = view;

    this._drag = new Drag(
      this.view.container,
      this.onTranslate.bind(this),
      this.onStart.bind(this),
      this.onStop.bind(this)
    )

    this._startPosition = null;

    this.element = document.createElement("div");

    this.element.style.position = "absolute";
    this.element.style.zIndex = 2;
    this.element.style.pointerEvents = "none";

    this.view.area.appendChild(this.element);

    this.render();
  }

  onStart(e) {
    this.view.container.dispatchEvent(new PointerEvent("mousemove", e));
    const { x, y } = this.view.area.mouse;
    this._startPosition = [x, y];
  }

  onTranslate(dx, dy) {
    let x1 = this._startPosition[0] + dx;
    let y1 = this._startPosition[1] + dy;
    this.update(x1, y1);
  }

  onStop(e) {
    this._startPosition = null;
    this.update(0, 0);
    console.log(this.view.nodes);
  }

  renderPath(x2, y2) {
    const [x1, y1] = this._startPosition;

    return `M ${x1} ${y1} H ${x2} V ${y2} H ${x1} L ${x1} ${y1}`;
  }

  update(x, y) {
    let d = "";
    if (this._startPosition !== null) d = this.renderPath(x, y);
    const rect = this.element.querySelector("svg path.node-selection-rect");
    rect.setAttribute("fill", "rgb(255 255 255 / 50%)");
    rect.setAttribute("stroke", "blue");
    rect.setAttribute("strokeWidth", 2);
    rect.setAttribute("d", d);
  };

  render() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "path");

    rect.setAttribute("class", "node-selection-rect");
    svg.style.overflow = "visible";

    svg.appendChild(rect);
    this.element.appendChild(svg);
  }
}

export default Selection;