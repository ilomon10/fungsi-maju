class Node {
  constructor(id, type, outputs = []) {
    this.id = id;
    this.type = type;
    this.outputs = outputs;
  }

  addOutput(branch) {
    if (!this.outputs[branch]) this.outputs[branch] = [];
    else this.outputs.push([]);

    return this;
  }

  removeOutput(id) {
    this.outputs = this.outputs.filter(output => output !== id);
    return this;
  }

  connect(branch, to) {
    if (this.outputs[branch])
      this.outputs[branch].push(to);
    else {
      this.addOutput(branch);
      this.connect(branch, to);
    }
    return this;
  }

  toJSON() {
    const data = { id: this.id, type: this.type, outputs: this.outputs };
    return data;
  }
}

export default Node;