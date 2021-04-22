'use strict';

class Node {
  constructor(key, data, left = null, right = null) {
    this.key = key;
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Cursor {
  constructor(nodes) {
    this.nodes = nodes;
  }
}

class AVLTree {
  constructor(options = {}) {
    this.compareKeys = options.compareKeys ? options.compareKeys : this._compareKeys;
    this.root = null;
    
    this.keys = new Set();
  }
  
  insert(key, data) {
    const node = this.root;
    if (node === null) {
      this.root = new Node(key, data);
      this.keys.add(key);
      return this; // Might need to change later, dunno if to return tree, node or nothing at all.
    } else {
      const treeRecursion = node => {
        const compare = this.compareKeys(key, node.key);
        if (compare == 0) {
          return node;
        } else if (compare < 0) {
          if (node.left === null) {
            node.left = new Node(key, data);
            this.keys.add(key);
            return this;
          }
          return treeRecursion(node.left);
        } else if (compare > 0) {
          if (node.right === null) {
            node.right = new Node(key, data);
            this.keys.add(key);
            return this;
          }
          return treeRecursion(node.right);
        }
      };
      return treeRecursion(node);
    }
  }

  get(key) {
    const node = this.root;
    if (node) {
      if (key === node.key) {
        const treeRecursion = node => {
          const compare = this.compareKeys(key, node.key);
          if (compare == 0) {
            return node;
          } else if (compare < 0) {
            return treeRecursion(node.left);
          } else if (compare > 0) {
            return treeRecursion(node.right);
          }
        };
        return treeRecursion(node);
      }
    }
  }

  select(query) {
    let results;
    const keys = Object.keys(query);
    this.traverse(this.root, node => {
      results = results || new Set(this.results);
      const { data } = node;
      for (const field of keys) {
        if (data[field] === query[field]) {
          results.add(data);
        }
      }
    });
    return new Cursor(results);
  }

  traverse(node, cb) {
    cb(node);
    if (node.left) {
      this.traverse(node.left, cb);
    }
    if (node.right) {
      this.traverse(node.right, cb);
    }
  }

  _compareKeys(a, b) {
    return a.localeCompare(b);
  }
}

module.exports = AVLTree;