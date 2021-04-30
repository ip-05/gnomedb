
/** Class representing a tree node */
class Node {
  /** 
   * Create a new node
   * @param {string} key Key of node
   * @param {*} data Data stored in node
   */
  constructor(key, data) {
    this.key = key;
    this.data = data;

    this.left = null;
    this.right = null;
  }

  /**
   * Get height of node
   * @returns {number} Height of node
   */
  getHeight(node = this) {
    if (!node) return -1;
    return Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  }
}

/** Class representing a binary search tree */
class BinarySearchTree {
  /**
   * Create a new binary search tree
   * @param {*} options Options for tree
   */
  constructor(options = {}) {
    this.root = null;
    this.fieldKey = options.fieldKey;
    this.compareKeys = options.compareKeys | this._compareKeys;
  }

  /**
   * Add a new node to the tree
   * @param {*} data 
   * @returns {*} Added node
   */
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

  /**
   * Remove a node from the tree
   * @param {*} data Data to remove from the tree
   * @returns {boolean} Success or failure
   */
  remove(data) {
    // Issue #11
    // Alina Dyachenko Workspace
  }

  /**
   * Get height of tree (root node)
   * @returns {number} Height of tree
   */
  getHeight() {
    const { root } = this;
    if (!root) return -1;
    return root.getHeight();
  }

  /**
   * Find a node by its key
   * @param {*} key Key of node in the tree
   * @returns {*} Node found
   */
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

  /**
   * Recurse the tree
   * @param {*} direction Direction to recurse 
   * @param {*} node Node to recurse from
   * @returns {*} Lowest node in direction
   */
  recurseTree(direction, node) {
    const tempNode = direction === 'left' ? node.left : node.right;
    if (node && !tempNode) {
      return node;
    }
    return this.recurseTree(direction, tempNode);
  }

  /**
   * Check if tree is balanced
   * @returns {Boolean} Is balanced
   */
  isBalanced() {
    return (this.findMinHeight() >= this.findMaxHeight() - 1);
  }

  /**
   * Find minimum height of tree
   * @param {*} node 
   * @returns {Number} Minimum height
   */
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

  /**
   * Find maximum height of tree
   * @param {*} node 
   * @returns {Number} Maximum height
   */
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

  /**
   * Find node with minimum key in the tree
   * @returns {*} Minimum node
   */
  findMin() {
    return this.recurseTree('left', this.root);
  }

  /**
   * Find node with maximum key in the tree
   * @returns {*} Maximum node
   */
  findMax() {
    return this.recurseTree('right', this.root);
  }

  /**
   * Compares two keys
   * @returns {number} Comparison result
   */
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