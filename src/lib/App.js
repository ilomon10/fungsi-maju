import Component from './Component';
import './css/App.css';

class App {
  version = null;
  components = {};

  constructor(version) {
    this.version = version;
  }

  register = (component) => {
    if (!(component instanceof Component)) throw new Error("Not Valid Component");
    if (!component.name) throw new Error(`Property name is \`${component.name}\``);

    this.components[component.name] = component;

    return this;
  }

  process = (json, initNodeId, input = null) => {
    let { version, nodes } = json;
    if (version !== this.version) throw new Error("Version incompatible");

    let node = nodes.find(node => node.id === initNodeId);

    let path = {};

    const run = (node, input) => {
      if (!node) return true;

      const component = this.components[node.type];
      if (!component) throw new Error(`Component \`${node.type}\` not registered`);

      const output = component.worker(node, input);

      if (!Array.isArray(node.output)) return false;
      if (node.output.length > 1) {
      }

      if (!path[node.id])
        path[node.id] = [];

      node.output.forEach((id) => {

        if (path[node.id])
          path[node.id].push(id);

        if (path[node.id].indexOf(id) !== -1) {
          console.log("path", path);
          throw new Error("recursive");
        }
        
        run(nodes.find(node => node.id === id), output);

      });
    }
    run(node, input);

    return this;
  }
}

export default App;