class Node {
  constructor(id, type, outputs = []) {
    this.id = id;
    this.type = type;
    this.outputs = outputs;
  }

  addOutput(branch, id) {

    if (!this.outputs[branch])
      this.outputs[branch] = [];

    if (id)
      this.outputs[branch].push(id);

    return this;
  }

  removeOutput(id, branch = null) {
    let result = [];

    if (branch) result = this.outputs[branch].filter(output => output !== id);
    else result = this.outputs.map(output => output.filter(out => out !== id));

    this.outputs = result;

    return this;
  }

  toJSON() {
    const data = { id: this.id, type: this.type, outputs: this.outputs };
    return data;
  }
}

export default Node;