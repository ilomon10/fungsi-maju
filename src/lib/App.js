import { ids } from 'webpack';
import Component from './Component';
import './css/App.css';

class App {
  version = null;
  components = {};
  json = null;

  constructor(version) {
    this.version = version;
  }

  register = (component) => {
    if (!(component instanceof Component)) throw new Error("Not Valid Component");
    if (!component.name) throw new Error(`Property name is \`${component.name}\``);

    this.components[component.name] = component;

    return this;
  }

  validate = () => {
    if (typeof this.json !== "object") return false;

    if (this.json.version !== this.version) return false;

    if (!Array.isArray(this.json.nodes)) return false;
    return true;
  }

  forwardProcess = (node, input) => {
    node.outputs.forEach((id) => {
      const component = this.components[node.type];
      const output = component.worker(node, input);

      const nextNode = this.json.nodes.find(node => node.id === id);

      this.forwardProcess(nextNode, output);
    });
  }

  process = (json = null, startId, input = null) => {
    if (json) this.json = Object.assign({}, json);

    if (!this.validate()) return false;

    const { nodes } = this.json;

    let node = nodes.find(node => node.id === startId);

    this.forwardProcess(node, input);

    return true;
  }
}

export default App;