class Element {
  sockets = {
    input: {},
    output: {},
  };

  constructor(nodeView, name) {
    this.nodeView = nodeView;
    this.element = document.createElement("div");
    this.content = document.createElement("div");
    this.input = document.createElement("div");
    this.output = document.createElement("div");

    this.element.setAttribute("class", "node");
    this.input.setAttribute("class", "node-input");
    this.output.setAttribute("class", "node-output");
    this.content.setAttribute("class", "node-content");

    this.content.innerHTML = name || "";

    this.element.appendChild(this.content);
    this.element.appendChild(this.input);
    this.element.appendChild(this.output);
  }

  addSocket(type, branch, name) {
    const element = document.createElement("div");
    element.setAttribute("class", `node-socket-${branch}`);
    const content = document.createElement("div");
    element.appendChild(content);
    content.innerHTML = name || branch;

    const socket = {
      name, element
    }

    if (type === "input" || type === "output")
      this.sockets[type][branch] = socket;

    return socket;
  }

  render(view, node) {
    if (!!view.selected[node.id]) this.element.classList.add("selected");
    else this.element.classList.remove("selected");

    const types = Object.keys(this.sockets);
    for (let type of types) {
      const sockets = Object.keys(this.sockets[type]);

      for (let key of sockets) {
        const socket = this.sockets[type][key];

        switch (type) {
          case "input":
            this.input.appendChild(socket.element);
            break;
          case "output":
            this.output.appendChild(socket.element);
            break;
          default: break;
        }
      }
    }
    return this.element;
  }
}

export default Element;