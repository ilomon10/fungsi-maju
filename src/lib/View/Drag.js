class Drag {
  constructor(element, onTranslate, onStart, hotkey = null) {
    this.pointerStart = null;
    this.onTranslate = onTranslate;
    this.onStart = onStart;

    this.element = element;
    this.element.addEventListener("pointerdown", this.down.bind(this));

    this.keypress = null;

    if (hotkey) {
      this.keypress = false;
      window.addEventListener("keydown", this.keyDown.bind(this, hotkey));
      window.addEventListener("keyup", this.keyUp.bind(this, hotkey));
    }

    window.addEventListener("pointermove", this.move.bind(this));
    window.addEventListener("pointerup", this.up.bind(this));
  }

  keyDown(hotkey, event) {
    if (event.key === hotkey) {
      this.element.style.cursor = "grab";
      this.keypress = true;
    }
  }
  keyUp(hotkey, event) {
    if (event.key === hotkey) {
      this.element.style.cursor = "initial";
      this.keypress = false;
    }
  }

  down(event) {
    if (this.keypress !== null && this.keypress === false) return;
    if (event.pointerType === "mouse")
      event.stopPropagation();
    this.pointerStart = [event.pageX, event.pageY];
    this.onStart(event);
  }

  move(event) {
    if (!this.pointerStart) return;
    event.preventDefault();

    let [x, y] = [event.pageX, event.pageY];

    let delta = [x - this.pointerStart[0], y - this.pointerStart[1]];

    let zoom = this.element.getBoundingClientRect().width / this.element.offsetWidth;

    this.onTranslate(delta[0] / zoom, delta[1] / zoom, event);
  }

  up(event) {
    if (!this.pointerStart) return;
    this.pointerStart = null;
  }
}

export default Drag;