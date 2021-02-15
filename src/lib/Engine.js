import Component from './Component';
import './css/App.css';
import Recursion from './Recursion';

class Engine {
  version = null;
  components = {};
  data = null;

  constructor(version) {
    this.version = version;
  }

  register = (component) => {
    if (!(component instanceof Component)) throw new Error("Not Valid Component");
    if (!component.name) throw new Error(`Property name is \`${component.name}\``);

    component.engine = this;

    this.components[component.name] = component;

    return this;
  }

  validate = (data) => {
    if (typeof data !== "object") return false;
    if (data.version !== this.version) throw new Error("Version not compatible");
    if (!Array.isArray(data.nodes)) return false;

    const recursion = new Recursion(data.nodes);
    const recurrentNode = recursion.detect();

    if (recurrentNode)
      throw new Error(`Recursion detected at \`${recurrentNode.id}\``)

    return true;
  }

  forwardProcess = (node, input) => {
    if (input === undefined) return false;
    const component = this.components[node.type];
    let output = component.worker(node, input);

    return node.outputs.reduce((_, outputNodeIds, idx) => {
      let nextInput = output;
      if (Array.isArray(output)) nextInput = output[idx];
      return outputNodeIds.reduce((_, nodeId) => {
        const nextNode = this.data.nodes.find(node => node.id === nodeId);
        return this.forwardProcess(nextNode, nextInput);
      }, true);
    }, true);
  }

  process = (input, startId, json = null) => {
    if (json) this.data = Object.assign({}, json);

    if (!this.validate(this.data)) return false;

    const { nodes } = this.data;

    let node = nodes.find(node => node.id === startId);

    this.forwardProcess(node, input);

    return true;
  }
}

export default Engine;