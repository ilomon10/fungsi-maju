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
    this._endPosition = null;

    this.element = document.createElement("div");

    this.element.style.position = "absolute";
    this.element.style.zIndex = 2;
    this.element.style.pointerEvents = "none";

    this.view.area.appendChild(this.element);

    this.render();
  }

  onStart(e) {
    if (e.defaultPrevented) return false;
    this.view.container.dispatchEvent(new PointerEvent("mousemove", e));
    const { x, y } = this.view.area.mouse;
    this._startPosition = [x, y];
    e.preventDefault();
  }

  onTranslate(dx, dy) {
    if (this._startPosition === null) return false;
    let x1 = this._startPosition[0] + dx;
    let y1 = this._startPosition[1] + dy;
    this._endPosition = [x1, y1];
    this.update(x1, y1);
  }

  onStop(_e) {
    if (this._startPosition === null || this._endPosition === null) return false;

    let selection = [];
    const direction = [
      this._startPosition[0] >= this._endPosition[0],
      this._startPosition[1] >= this._endPosition[1]
    ]

    if (direction[0] && direction[1]) {
      selection = [
        this._endPosition[0], this._endPosition[1],
        this._startPosition[0], this._startPosition[1],
      ];
    } else if (direction[0] && !direction[1]) {
      selection = [
        this._endPosition[0],
        this._startPosition[1],
        this._endPosition[1],
        this._startPosition[0],
      ];
    } else if (!direction[0] && direction[1]) {
      selection = [
        this._startPosition[0],
        this._endPosition[1],
        this._startPosition[1],
        this._endPosition[0],
      ];
    } else {
      selection = [
        this._startPosition[0], this._startPosition[1],
        this._endPosition[0], this._endPosition[1]
      ];
    }

    const nodes = this.view.nodes;
    for (const key of Object.keys(nodes)) {
      const nodeView = nodes[key];
      const node = nodes[key].node;
      const el = nodeView.getElement();
      const x = node.position[0];
      const y = node.position[1];
      const bounding = [x, y, x + el.clientWidth, y + el.clientHeight];
      if (
        selection[0] <= bounding[0]
        && selection[1] <= bounding[1]
        && selection[2] >= bounding[2]
        && selection[3] >= bounding[3]
      ) {
        this.view.selectNode(nodeView, true);
      }
    }
    this._startPosition = null;
    this._endPosition = null;
    this.update(0, 0);
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