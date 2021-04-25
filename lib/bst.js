class Node {
  constructor(data) {
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
      this.root = new Node(data);
      return this;
    } else {
      const treeRecursion = node => {
        const compare = this._compareKeys(data[this.fieldKey], node.data[this.fieldKey]);
        if (compare > 0) {
          if (node.right === null) {
            node.right = new Node(data);
            return node.right;
          }
          return treeRecursion(node.right);
        } else if (compare < 0) {
          if (node.left === null) {
            node.left = new Node(data);
            return node.left;
          }
          return treeRecursion(node.left);
        } else {
          throw new Error('Trying to add entry with duplicate index.');
          // Idk how to handle duplicate indexes.
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