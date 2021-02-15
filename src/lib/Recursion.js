/* 
 * Deteksi Pengulangan
 * Ref: https://github.com/retejs/rete/blob/master/src/engine/recursion.ts
 */

const intersect = (array1, array2) => {
  return array1.filter(value => array2.indexOf(value) !== -1);
}

class Recursion {
  constructor(nodes) {
    this.nodes = nodes;
  }

  extractInputNode = (targetNode) => {
    return this.nodes.filter(node => {
      if (node.outputs.length < 1) return false;
      return node.outputs
        .reduce((acc, n) => {
          if (Array.isArray(n)) return [...acc, ...n]
          return acc;
        })
        .indexOf(targetNode.id) !== -1;
    });
  }

  findSelf = (nodes, inputNodes) => {
    const inters = intersect(nodes, inputNodes);

    if (inters.length)
      return inters[0];

    for (let node of inputNodes) {
      let l = [node, ...nodes];
      let inter = this.findSelf(l, this.extractInputNode(node));
      if (inter)
        return inter;
    }

    return null;
  }

  detect = () => {

    let nodes = this.nodes;

    for (let node of nodes) {
      const inters = this.findSelf([node], this.extractInputNode(node));

      if (inters)
        return inters;
    }

    return null;
  }
}

export default Recursion;