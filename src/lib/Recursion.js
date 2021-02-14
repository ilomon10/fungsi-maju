class Recursion {
  constructor(nodes) {
    this.nodes = nodes;
  }

  findSelf = (node) => {
    const nodes = this.nodes.filter(n => {
      return n.outputs.indexOf(node.id) !== -1;
    }).filter((n)=> {
      return node.outputs.indexOf(n.id) !== -1;
    });

    if (nodes.length)
      return nodes[0];

    return null;
  }

  detect = () => {
    const nodesArr = this.nodes.map(node => node.id);

    let nodes = this.nodes;

    for (let nodeId of nodesArr) {
      const node = this.findSelf(nodes.find(node => node.id === nodeId));
      if (node)
        return node;
    }

    return null;
  }
}

export default Recursion;