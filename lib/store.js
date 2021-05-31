'use strict';

const BinarySearchTree = require('./bst.js');

class DataStore {
  constructor(options = {}) {
    this.defaultFieldIndex = options.defaultFieldIndex || '_id';
    this.indeces = new Map();
    this.init();
  }

  init() {
    this.index(this.defaultFieldIndex);
    return this;
  }

  // remove(doc)

  // find(query)
}

module.exports = DataStore;
