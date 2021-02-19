import Drag from "./Drag";

class Selection {
  constructor(view) {
    this.view = view;
    console.log(this);
    this._drag = new Drag(this.view.container, this.onTranslate.bind(this), this.onStart.bind(this))

    this.element = document.createElement("div");
    
    this.element.style.position = "absolute";
    this.element.style.zIndex = 2;
    this.element.style.pointerEvents = "none";

    this.view.container.appendChild(this.element);

    this.render();
  }

  onStart(e) {
    this._startPosition = [e.pageX, e.pageY];
    console.log("start");
  }

  onTranslate(dx, dy) {
    const x = this._startPosition[0] + dx;
    const y = this._startPosition[1] + dy;
    console.log("translate", x, y);
    this.update(x, y);
  }

  renderPath(x2, y2) {
    const [x1, y1] = this._startPosition;

    return `M ${x1} ${y1} H ${x2} V ${y2} H ${x1} L ${x1} ${y1}`;
  }

  update(x, y) {
    const rect = this.element.querySelector("svg path.node-selection-rect");
    rect.setAttribute("fill", "red");
    rect.setAttribute("d", this.renderPath(x, y));
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