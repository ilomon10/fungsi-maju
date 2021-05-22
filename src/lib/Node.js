class Metadata extends Map {
  toJSON() {
    const ret = {};
    this.forEach(function (value, key) {
      ret[key] = value;
    });
    return ret;
  }
}
class Node {
  metadata = new Metadata();
  position = {
    x: 0,
    y: 0
  }
  constructor(id, type, outputs = [], options = {}) {
    this.id = id;
    this.type = type;
    this.outputs = outputs;
    this.position = options.position;

    if (options.metadata) {
      const md = Object.keys(options.metadata);
      if (md.length > 0) {
        for (const key of md) {
          this.metadata.set(key, options.metadata[key]);
        }
      }
    }
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
      metadata: this.metadata.toJSON(),
      outputs: [...this.outputs.map(output => [...output])]
    };

    if (complete) data.position = { ...this.position };

    return data;
  }
}

export default Node;