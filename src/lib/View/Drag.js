class Drag {
  constructor(element, onTranslate, onStart, hotkey = null) {
    this.pointerStart = null;
    this.onTranslate = onTranslate;
    this.onStart = onStart;
    
    this.down = this.down.bind(this);
    this.keyDown = this.keyDown.bind(this, hotkey);
    this.keyUp = this.keyUp.bind(this, hotkey);
    this.move = this.move.bind(this);
    this.up = this.up.bind(this);

    this.element = element;
    this.element.removeEventListener("pointerdown", this.down);
    this.element.addEventListener("pointerdown", this.down);

    this.keypress = null;

    if (hotkey) {
      this.keypress = false;
      window.removeEventListener("keydown", this.keyDown);
      window.removeEventListener("keyup", this.keyUp);
      window.addEventListener("keydown", this.keyDown);
      window.addEventListener("keyup", this.keyUp);
    }

    window.removeEventListener("pointermove", this.move);
    window.removeEventListener("pointerup", this.up);
    window.addEventListener("pointermove", this.move);
    window.addEventListener("pointerup", this.up);
  }

  keyDown(hotkey, event) {
    if (event.code === hotkey || event.key === hotkey) {
      this.element.style.cursor = "grab";
      this.keypress = true;
    }
  }
  keyUp(hotkey, event) {
    if (event.code === hotkey || event.key === hotkey) {
      this.element.style.cursor = "crosshair";
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