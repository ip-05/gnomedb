'use strict';

const BinarySearchTree = require('./bst.js');
const Utils = require('./utils.js');

class DataStore {
  constructor(options = {}) {
    this.defaultFieldKey = options.defaultFieldKey || '_id';
    this.indeces = new Map();
    this.filterTree = {};
    this.init();
  }

  init() {
    this.index(this.defaultFieldKey);

    this.filterTree['$gt'] = (tree, val) => tree.filterGreaterThan(val);
    this.filterTree['$gte'] = (tree, val) => tree.filterGreaterThan(val, true);
    this.filterTree['$lt'] = (tree, val) => tree.filterLessThan(val);
    this.filterTree['$lte'] = (tree, val) => tree.filterLessThan(val, true);

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
    const uniqueId = Utils.uuid();
    data[this.defaultFieldKey] = uniqueId;
    for (const index of Object.keys(data)) {
      let tree = indeces.get(index);
      if (!tree) tree = this.index(index);
      tree.add(data);
    }

    return data;
  }

  addFrom(obj) {
    const data = new Set();
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
      data.add(this.add(node));
    }

    return data;
  }

  remove(doc) {
    for (const [, idx] of this.indeces) {
      idx.remove(doc);
    }
  }

  find(query) {
    let vertices;
    const keys = Object.keys(query);
    for (const key of keys) {
      const tree = this.indeces.get(key);
      if (!tree) {
        throw new Error('No such index');
      }
      const subQuery = query[key];
      if (typeof subQuery === 'object') {
        const subQueryKeys = Object.keys(subQuery);
        for (const subQueryKey of subQueryKeys) {
          const compareKey = this.filterTree[subQueryKey];
          if (!compareKey) {
            throw new Error('No such compare key');
          }
          const val = subQuery[subQueryKey];
          const compare = this.filterTree[subQueryKey](tree, val);
          const data = compare.data;
          vertices = vertices ? Utils.intersection(vertices, data) : data;
        }
      } else {
        const records = tree.findByKey(subQuery);
        const data = records.data;
        if (!data) {
          console.log('no data');
        }
        vertices = vertices ? Utils.intersection(vertices, data) : data;
      }
    }
    return vertices;
  }
}

module.exports = DataStore;
