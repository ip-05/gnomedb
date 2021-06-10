'use strict';

const Cursor = require('./cursor.js');
const Node = require('./node.js');

class BinarySearchTree {
  constructor(options = {}) {
    this.root = null;
    this.fieldKey = options.fieldKey;
  }

  add(data) {
    const key = data[this.fieldKey];
    const newNode = new Node(key, new Set([data]));
    if (!this.root) {
      return (this.root = newNode);
    }
    const treeRecursion = node => {
      const compare = BinarySearchTree.compareKeys(key, node.key);
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
      node.data.add(data);
      return node;
    };
    return treeRecursion(this.root);
  }

  addFrom(obj) {
    const type = typeof obj;
    if (obj === undefined || type !== 'object') {
      throw new Error('Collection of Objects was expected!');
    }

    const length = Object.keys(obj).length || obj.length;
    if (!length) {
      throw new Error('Object must have a non-zero length!');
    }

    const keys = Object.keys(obj);
    for (const key of keys) {
      const node = obj[key];
      this.add(node);
    }

    return this;
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
            if (prevNode) {
              prevNode[lastBranch] = null;
              allData.forEach(el => this.add(el));
            } else {
              this.root = null;
            }
          }
        } else {
          return new Error('There is no such data for this key');
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

  getHeight(node) {
    if (node !== undefined) {
      if (node) return node.getHeight();
      return -1;
    }

    const { root } = this;
    if (!root) return -1;
    return root.getHeight();
  }

  findByKey(key) {
    const results = new Set();
    const treeRecursion = node => {
      if (node === null) return null;
      const compare = BinarySearchTree.compareKeys(key, node.key);
      if (compare > 0) {
        return treeRecursion(node.right);
      }
      if (compare < 0) {
        return treeRecursion(node.left);
      }
      return results.add(node);
    };
    treeRecursion(this.root);
    return new Cursor(results);
  }

  filterLessThan(val, equal = false) {
    const results = new Set();
    const treeRecursion = node => {
      if (node.key === val && node.left) {
        if (equal) results.add(node);
        treeRecursion(node.left);
      } else {
        if (node.key < val) results.add(node);
        if (node.right) treeRecursion(node.right);
        if (node.left) treeRecursion(node.left);
      }
    };
    treeRecursion(this.root);
    return new Cursor(results);
  }

  filterGreaterThan(val, equal = false) {
    const results = new Set();
    const treeRecursion = node => {
      if (node.key === val && node.right) {
        if (equal) results.add(node);
        treeRecursion(node.right);
      } else {
        if (node.key > val) results.add(node);
        if (node.right) treeRecursion(node.right);
        if (node.left) treeRecursion(node.left);
      }
    };
    treeRecursion(this.root);
    return new Cursor(results);
  }

  static compareKeys(a, b) {
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
