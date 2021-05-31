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

  index(fieldKey) {
    const treeByIndex = new BinarySearchTree({ fieldKey });
    this.indeces.set(fieldKey, treeByIndex);
    return this;
  }

  // remove(doc)

  // find(query)

  intersection(s1, s2) {
    return DataStore.handleUndefined(
      s1,
      s2,
      (_s1, _s2) => new Set([..._s1].filter(data => _s2.has(data)))
    );
  }

  union(s1, s2) {
    return DataStore.handleUndefined(s1, s2, (_s1, _s2) => new Set([..._s1, ..._s2]));
  }

  static handleUndefined(s1, s2, operation) {
    const s1Type = typeof s1,
      s2Type = typeof s2;
    if (s1Type === 'undefined') return s2;
    if (s2Type === 'undefined') return s1;
    if (s1Type === 'undefined' && s2Type === 'undefined') return null;
    return operation(s1, s2);
  }
}

module.exports = DataStore;
