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
    if (!node) {
      return (this.root = newNode);
    }
    const treeRecursion = (node) => {
      const compare = this._compareKeys(key, node.key);
      if (compare > 0) {
        if (!node.right) {
          return (node.right = newNode);
        }
        return treeRecursion(node.right);
      }
      if (compare < 0) {
        if (!node.left) {
          return (node.left = newNode);
        }
        return treeRecursion(node.left);
      }
      if (compare === 0) {
        node.data.add(data);
        return node;
      }
    };
    return treeRecursion(node);
  }

  remove(data) {
    let lastBranch = '';
    const removeData = (data, node, prevNode = null) => {
      if (!node) {
        return null;
      }
      if (node.key === data[this.fieldKey]) {
        if (node.data.has(data)) {
          node.data.delete(data);
          if (!node.data.size) {
            const allData = node.getChildren();
            prevNode[lastBranch] = null;
            allData.forEach(el => this.add(el));
          }
        } else {
          console.log('There is no such data for this key');
        }
      } else {
        if (node.left && data[this.fieldKey] < node.key) {
          lastBranch = 'left';
          removeData(data, node.left, node);
        }
        if (node.right && data[this.fieldKey] > node.key) {
          lastBranch = 'right';
          removeData(data, node.right, node);
        }
      }
    };
    removeData(data, this.root);
  }

  getHeight() {
    const { root } = this;
    if (!root) return -1;
    return root.getHeight();
  }

  findByKey(key) {
    const treeRecursion = (node) => {
      if (node === null) return null;
      const compare = this._compareKeys(key, node.key);
      if (compare > 0) {
        return treeRecursion(node.right);
      }
      if (compare < 0) {
        return treeRecursion(node.left);
      }
      if (compare === 0) {
        return new Cursor(new Set([node]));
      }
    };
    return treeRecursion(this.root);
  }

  recurseTree(direction, node) {
    const tempNode = direction === 'left' ? node.left : node.right;
    if (node && !tempNode) {
      return node;
    }
    return this.recurseTree(direction, tempNode);
  }

  isBalanced() {
    return (this.findMinHeight() >= this.findMaxHeight() - 1);
  }

  findMinHeight(node = this.root) {
    if (!node) return -1;
    let left = this.findMinHeight(node.left);
    let right = this.findMinHeight(node.right);
    if (left < right) {
      return left + 1;
    } else {
      return right + 1;
    }
  }

  findMaxHeight(node = this.root) {
    if (!node) return -1;
    let left = this.findMinHeight(node.left);
    let right = this.findMinHeight(node.right);
    if (left > right) {
      return left + 1;
    } else {
      return right + 1;
    }
  }

  findMin() {
    return this.recurseTree('left', this.root);
  }

  findMax() {
    return this.recurseTree('right', this.root);
  }

  getNodesLessThan(val) {
    const results = new Set();
    const treeRecursion = node => {
      if (node.key === val) {
        if (node.left) {
          treeRecursion(node.left);
        }
      } else if (node.key < val) {
        results.add(node);
        if (node.left) {
          treeRecursion(node.left);
        }
      } else if (node.key > val) {
        if (node.left) {
          treeRecursion(node.left);
        }
      }
    };
    treeRecursion(this.root);
    return new Cursor(results);
  }

  getNodesGreaterThan(val) {
    const results = new Set();
    const treeRecursion = node => {
      if (node.key === val) {
        if (node.right) {
          treeRecursion(node.right);
        }
      } else if (node.key > val) {
        results.add(node);
        if (node.right) {
          treeRecursion(node.right);
        }
      } else if (node.key < val) {
        if (node.right) {
          treeRecursion(node.right);
        }
      }
    };
    treeRecursion(this.root);
    return new Cursor(results);
  }

  _compareKeys(a, b) {
    const [typeA, typeB] = [typeof a, typeof b];
    if (typeA === 'number' && typeB === 'number') {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    }
    if (typeA === 'string' && typeB === 'string') {
      return a.localeCompare(b);
    }
    throw new Error('Parameters must be both type of String or Number!');
  }
}

module.exports = BinarySearchTree;