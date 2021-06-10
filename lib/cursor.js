'use strict';

class Cursor {
  constructor(nodes) {
    this.nodes = nodes;
  }

  get data() {
    const data = new Set();
    for (const node of this.nodes) {
      for (const nodeData of node.data) {
        data.add(nodeData);
      }
    }
    return data;
  }
}

module.exports = Cursor;
