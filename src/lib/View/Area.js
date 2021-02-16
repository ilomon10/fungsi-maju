import '../css/View.css';
import Drag from "./Drag";

class Area {
  constructor(container) {
    this.element = document.createElement("div");
    this.container = container;

    this.element.style.transformOrigin = "0 0";

    this.background = document.createElement("div");
    this.background.className = "node-editor-background";

    this.element.appendChild(this.background);

    this._drag = new Drag(
      this.container,
      this.onTranslate.bind(this),
      this.onStart.bind(this),
      "Control"
    );

    this.transform = {
      x: 0, y: 0, z: 1
    }

    this.update();
  }

  onStart() {
    this._startPosition = { ...this.transform };
  }

  onTranslate(dx, dy) {
    // if (this._zoom.translating) return; // lock translation while zoom on multitouch
    if (this._startPosition) this.translate(this._startPosition.x + dx, this._startPosition.y + dy);
  }

  update() {
    const tf = this.transform;
    this.element.style.transform = `translate(${tf.x}px, ${tf.y}px) scale(${tf.z})`;
  }

  translate(x, y) {
    this.transform.x = x
    this.transform.y = y
    this.update();
  }

  appendChild(element) {
    this.element.appendChild(element);
  }
  removeChild(element) {
    this.element.removeChild(element);
  }
}

export default Area;