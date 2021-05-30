'use strict';

class Node {
  constructor(key, data) {
    this.key = key;
    this.data = data;

    this.left = null;
    this.right = null;
  }

  getHeight(node = this) {
    if (!node) return -1;
    return Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  }
}

module.exports = Node;
