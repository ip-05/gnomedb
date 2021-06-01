'use strict';

const BinarySearchTree = require('./bst.js');
const uuid = require('./utils.js');

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

  add(data) {
    const type = typeof data;
    if (data === undefined || type !== 'object') {
      throw new Error('Object of data was expected!');
    }

    const { length } = Object.keys(data);
    if (!length) {
      throw new Error('Object must have a non-zero length!');
    }

    const { indeces } = this;
    const uniqueId = uuid();
    for (const [, tree] of indeces) {
      data[this.defaultFieldIndex] = uniqueId;
      tree.add(data);
    }
    return this;
  }

  addFrom(obj) {
    const type = typeof obj;
    if (obj === undefined || type !== 'object') {
      throw new Error('Collection of Objects was expected!');
    }

    const length = Object.keys(obj).length || obj.length; // object or array
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

  remove(doc) {
    for (const [_, idx] of this.indeces) {
      idx.remove(doc);
    }
  }

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
