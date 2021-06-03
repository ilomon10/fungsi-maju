class Node {
  metadata = {};
  position = [0, 0];
  constructor(id, type, outputs = [], options = {}) {
    this.id = id;
    this.type = type;
    this.outputs = outputs;

    if (options.position) this.position = options.position;
    if (options.metadata) this.metadata = options.metadata;
  }

  setData(key, value) {
    this.metadata[key] = value;
    return this.metadata;
  }

  getData(key) {
    return this.metadata[key];
  }

  removeData(key) {
    delete this.metadata[key];
    return this.metadata;
  }

  addOutput(branch, id) {

    if (!this.outputs[branch])
      this.outputs[branch] = [];

    if (id
      && this.outputs[branch].indexOf(id) === -1
    ) {
      this.outputs[branch].push(id);
    }

    return this;
  }

  removeOutput(id, branch = null) {
    let result = [];

    if (branch) result = this.outputs[branch].filter(output => output !== id);
    else result = this.outputs.map(output => output.filter(out => out !== id));

    this.outputs = result;

    return this;
  }

  toJSON(complete = false) {
    let data = {
      id: this.id,
      type: this.type,
      metadata: this.metadata,
      outputs: [...this.outputs.map(output => [...output])]
    };

    if (complete) data.position = { ...this.position };

    return data;
  }
}

export default Node;