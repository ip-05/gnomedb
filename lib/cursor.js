'use strict';

class Cursor {
  constructor(nodes) {
    this.nodes = nodes;
  }

  getData() {
    const data = [];
    for (const node of this.nodes) {
      for (const nodeData of node.data) {
        data.push(nodeData);
      }
    }
    return data;
  }
}

module.exports = Cursor;
