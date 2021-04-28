class Node {
  constructor(key, data) {
    this.key = key;
    this.data = data;

    this.left = null;
    this.right = null;
  }

  getHeight() {
    // Issue #9
    // Nikolai Chub Workspace
  }
}

class BinarySearchTree {
  constructor(options = {}) {
    this.root = null;
    this.fieldKey = options.fieldKey;
    this.compareKeys = options.compareKeys | this._compareKeys;
  }

  add(data) {
    const node = this.root;
    const key = data[this.fieldKey];
    const newNode = new Node(key, new Set([data]));
    if (node === null) {
      return this.root = newNode;
    }
    const treeRecursion = (node) => {
      const compare = this._compareKeys(key, node.key);
      if (compare > 0) {
        if (node.right === null) {
          return node.right = newNode;
        }
        return treeRecursion(node.right);
      }
      if (compare < 0) {
        if (node.left === null) {
          return node.left = newNode;
        }
        return treeRecursion(node.left);
      }
      if (compare === 0) {
        node.data.add(data);
      }
    };
    return treeRecursion(this.root);
  }

  remove(data) {
    // Issue #11
    // Alina Dyachenko Workspace
  }

  findByKey(key) {
    const treeRecursion = (node) => {
      const compare = this._compareKeys(key, node.key);
      if (compare > 0) {
        return treeRecursion(node.right);
      }
      if (compare < 0) {
        return treeRecursion(node.left);
      }
      if (compare === 0) {
        return node;
      }
    };
    return treeRecursion(this.root);
  }

  recurseTree(direction, node) {
    const tempNode = direction === 'left' ? node.left : node.right;
    if (node !== null && tempNode === null) {
      return node;
    }
    return this.recurseTree(direction, tempNode);
  }

  findMin() {
    return this.recurseTree('left', this.root);
  }

  findMax() {
    return this.recurseTree('right', this.root);
  }

  _compareKeys(a, b) {
    return a.toString().localeCompare(b.toString());
  }
}

module.exports = BinarySearchTree;
