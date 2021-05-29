const Node = require('./node.js');

class BinarySearchTree {
  constructor(options = {}) {
    this.root = null;
    this.fieldKey = options.fieldKey;
    this.compareKeys = options.compareKeys || this.compareKeys;
  }

  add(data) {
    const key = data[this.fieldKey];
    const newNode = new Node(key, new Set([data]));
    if (!this.root) {
      this.root = newNode;
      return newNode;
    }
    const treeRecursion = (node) => {
      const compare = BinarySearchTree.compareKeys(key, node.key);
      if (compare > 0) {
        if (!node.right) {
          node.right = newNode;
          return newNode;
        }
        return treeRecursion(node.right);
      }
      if (compare < 0) {
        if (!node.left) {
          node.left = newNode;
          return newNode;
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
    if (!obj || type !== 'object') return new Error('Collection of Objects was expected!');

    const length = Object.keys(obj).length || obj.length; // object or array
    if (!length) return new Error('Object must have a non-zero length!');

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
      if (!node) return null;
      if (node.key === data[this.fieldKey]) {
        if (node.data.has(data)) {
          node.data.delete(data);
          if (!node.data.size) {
            // нужно менять дерево если дата пустая
            const allData = findSubData(node);
            prevNode[lastBranch] = null;
            allData.forEach((el) => this.add(el));
          }
        } else {
          console.log('There is no such data for this key');
        }
      } else {
        const check = node.left && data[this.fieldKey] < node.key;
        lastBranch = check ? 'left' : 'right';
        removeData(data, check ? node.left : node.right, node);
      }
    };

    const findSubData = (forNode) => {
      const datas = [];
      const find = (node) => {
        if (node.left) {
          node.left.data.forEach((el) => {
            datas.push(el);
          });
          find(node.left);
        }
        if (node.right) {
          node.right.data.forEach((el) => {
            datas.push(el);
          });
          find(node.right);
        }
      };
      find(forNode);
      return datas;
    };
    removeData(data, this.root);
  }

  findByKey(key) {
    const treeRecursion = (node) => {
      const compare = BinarySearchTree.compareKeys(key, node.key);
      if (compare > 0) {
        return treeRecursion(node.right);
      }
      if (compare < 0) {
        return treeRecursion(node.left);
      }
      return node;
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

  getHeight(node) {
    // if node passed, getHeight of it
    if (node !== undefined) {
      if (node) return node.getHeight();
      return -1;
    }

    // if no arguments, getHight of tree
    const { root } = this;
    if (!root) return -1;
    return root.getHeight();
  }

  findMinHeight(node = this.root) {
    if (!node) return -1;
    const left = this.findMinHeight(node.left);
    const right = this.findMinHeight(node.right);
    if (left < right) {
      return left + 1;
    }
    return right + 1;
  }

  findMaxHeight(node = this.root) {
    if (!node) return -1;
    const left = this.findMinHeight(node.left);
    const right = this.findMinHeight(node.right);
    if (left > right) {
      return left + 1;
    }
    return right + 1;
  }

  findMin() {
    return this.recurseTree('left', this.root);
  }

  findMax() {
    return this.recurseTree('right', this.root);
  }

  static compareKeys(a, b) {
    const [typeA, typeB] = [typeof a, typeof b];
    if (typeA === 'number' && typeB === 'number') {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    }
    if (typeA === 'string' && typeB === 'string') {
      return a.toString().localeCompare(b.toString());
    }
    return new Error('Parameters must be both type of String or Number!');
  }
}

module.exports = BinarySearchTree;
