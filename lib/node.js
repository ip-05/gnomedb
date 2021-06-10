'use strict';

class Node {
  constructor(key, data) {
    this.key = key;
    this.data = data;

    this.left = null;
    this.right = null;
  }

  get children() {
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
    find(this);
    return children;
  }

  get height() {
    return Math.max(this.getHeight(this.left), this.getHeight(this.right)) + 1;
  }
}

module.exports = Node;
