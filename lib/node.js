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

  getChildren(node = this) {
    if (!node) return -1;
    const children = new Set();
    const find = node => {
      if (node.left) {
        node.left.data.forEach(el => {
          children.add(el);
        });
        find(node.left);
      }
      if (node.right) {
        node.right.data.forEach(el => {
          children.add(el);
        });
        find(node.right);
      }
    };
    find(node);
    return children;
  }
}

module.exports = Node;
