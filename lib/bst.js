class Node {
  constructor(key, data) {
    this.key = key;
    this.data = data;

    this.left = null;
    this.right = null;
  }

  getHeight() {
    // Issue #9
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
      const newNode = new Node(data[this.fieldKey], new Set());
      newNode.data.add(data);
      this.root = newNode;
      return this;
    } else {
      const treeRecursion = node => {
        const compare = this._compareKeys(data[this.fieldKey], node.key);
        if (compare > 0) {
          if (node.right === null) {
            const newNode = new Node(data[this.fieldKey], new Set());
            newNode.data.add(data);
            node.right = newNode;
            return node.right;
          }
          return treeRecursion(node.right);
        } else if (compare < 0) {
          if (node.left === null) {
            const newNode = new Node(data[this.fieldKey], new Set());
            newNode.data.add(data);
            node.left = new Node(newNode);
            return node.left;
          }
          return treeRecursion(node.left);
        } else if (compare === 0) {
          node.data.add(data);
        }
      };
      return treeRecursion(this.root);
    }
  }

  remove(data) {
    // Issue #11
  }

  recurseSearch(query) {
    // Issue #12
  }

  recurseTree(direction, node) {
    const tempNode = direction === 'left' ? node.left : node.right;
    if (node !== null && tempNode === null) {
      return node;
    } else {
      return this.recurseTree(direction, tempNode);
    } 
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