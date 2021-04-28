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
    let node = this.root;
    const key = data[this.fieldKey];
    if (node === null) {
      const newNode = new Node(key, new Set());
      newNode.data.add(data);
      this.root = newNode;
      return newNode;
    }
    const treeRecursion = (node) => {
      const compare = this._compareKeys(key, node.key);
      if (compare > 0) {
        if (node.right === null) {
          const newNode = new Node(key, new Set());
          newNode.data.add(data);
          node.right = newNode;
          return node.right;
        }
        return treeRecursion(node.right);
      }
      if (compare < 0) {
        if (node.left === null) {
          const newNode = new Node(key, new Set());
          newNode.data.add(data);
          node.left = new Node(newNode);
          return node.left;
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

  recurseSearch(query) {
    // Issue #12
    // Artem Bondarchuk Workspace
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
