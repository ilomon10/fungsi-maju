import Component from './Component';
import Emitter from './Emitter';
import Recursion from './Recursion';

const events = {
  process: [],
  nodeselected: [],
  nodecreate: [],
  nodecreated: [],
  noderemove: [],
  noderemoved: [],
  nodetranslated: [],
  connectionselected: [],
  connectioncreated: [],
  connectionremoved: [],
  contextmenu: [],
};

class Engine extends Emitter {
  version = null;
  components = {};
  nodes = null;

  constructor(version) {
    super(events);
    this.version = version;
  }

  /**
   * Register your custom component
   *
   * ```js
   * e.register(new MyComponent());
   * ```
   *
   * @param component The event name.
   */
  register(component) {
    if (!(component instanceof Component)) throw new Error("Not Valid Component");
    if (!component.name) throw new Error(`Property name is \`${component.name}\``);

    component.engine = this;

    this.components[component.name] = component;

    return this;
  }

  validate(data) {
    if (typeof data !== "object") return false;
    if (data.version !== this.version) throw new Error("Version not compatible");
    if (!Array.isArray(data.nodes)) return false;

    const recursion = new Recursion(data.nodes);
    const recurrentNode = recursion.detect();

    if (recurrentNode)
      throw new Error(`Recursion detected at \`${recurrentNode.id}\``)

    return true;
  }

  forwardProcess(node, input) {
    if (input === undefined) return false;
    const component = this.components[node.type];
    let output = component.worker(node, input);

    return node.outputs.reduce((_, outputNodeIds, idx) => {
      let nextInput = output;
      if (Array.isArray(output)) nextInput = output[idx];
      return outputNodeIds.reduce((_, nodeId) => {
        const nextNode = this.nodes.find(node => node.id === nodeId);
        return this.forwardProcess(nextNode, nextInput);
      }, true);
    }, true);
  }

  /**
   * Process data based on json
   *
   * ```js
   * e.process(input, startId, json = null);
   * ```
   *
   * @param input Input value.
   * @param startId Node id.
   * @param json Flow process.
   */
  process(input, startId, json = null) {
    if (!json) json = { version: this.version, nodes: this.nodes };

    if (this.validate(json))
      this.nodes = [...json.nodes];
    else return false;

    let node = this.nodes.find(node => node.id === startId);
    this.forwardProcess(node, input);

    this.emit("process", node);

    return true;
  }
}

export default Engine;