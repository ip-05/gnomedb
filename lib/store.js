'use strict';

const AVLTree = require('./avl.js');
const { generateTimeBasedId } = require('./util.js');

class DataStore {
  constructor() {
    this.tree = new AVLTree();
  }

  insert(doc) {
    const key = generateTimeBasedId();
    if (this.tree.keys.has(key)) {
      this.insert(doc);
    }

    doc._key = key;
    this.tree.insert(key, doc);
    this.tree.keys.add(key);
    return doc;
  }

  select(query) {
    return this.tree.select(query);
  }

  // Find not working yet
  find(cb) {
    let results = new Map();
    this.tree.traverse(this.tree.root, node => {
      const { data } = node;
      if (data) {
        if (this.cb(data)) {
          results.add(data);
        }
      }
    });
    return results;
  }
}

module.exports = DataStore;