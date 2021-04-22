class Node {
  constructor(data) {
    this.data = data;

    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor(options = {}) {
    this.root = null;

    this.fieldKey = options.fieldKey;
    this.compareKeys = options.compareKeys | this._compareKeys;
  }

  add(data) {
    let node = this.root;
    if (node === null) {
      this.root = new Node(data);
      return this;
    } else {
      while (node) {
        if (node !== null) {
          const compare = this._compareKeys(data[this.fieldKey], node.data[this.fieldKey]);
          if (compare > 0) {
            if (node.right === null) {
              const newNode = new Node(data);
              node.right = newNode;
              node = newNode;
              return this;
            } else {
              node = node.right;
            }
          } else if (compare < 0) {
            if (node.left === null) {
              const newNode = new Node(data);
              node.left = newNode;
              node = newNode;
              return this;
            } else {
              node = node.left;
            }
          }
        }
      }
    }
  }

  _compareKeys(a, b) {
    return a.toString().localeCompare(b.toString());
  }
}

module.exports = BinarySearchTree;