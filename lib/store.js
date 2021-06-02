'use strict';

const BinarySearchTree = require('./bst.js');
const uuid = require('./utils.js');

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
    const uniqueId = uuid();
    for (const [, tree] of indeces) {
      data[this.defaultFieldKey] = uniqueId;
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
    for (const [, idx] of this.indeces) {
      idx.remove(doc);
    }
  }

  find(query) {
    let vertices;
    const keys = Object.keys(query); // age
    for (const key of keys) {
      const tree = this.indeces.get(key);
      if (tree) {
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
            const data = compare.getData();
            vertices = vertices ? this.intersection(vertices, data) : data;
          }
        } else {
          const records = tree.findByKey(subQuery).getData();
          vertices = vertices ? this.intersection(vertices, records) : records;
        }
      } else {
        // look through all in tree matching query
        const defaultIndex = this.indeces.get(this.defaultFieldKey);
        // Query through default index
      }
    }
    return vertices;
  }

  intersection(s1, s2) {
    return this.handleUndefined(
      s1,
      s2,
      (_s1, _s2) =>
        new Set([..._s1].filter(data => new Set([..._s2]).has(data)))
    );
  }

  union(s1, s2) {
    return this.handleUndefined(
      s1,
      s2,
      (_s1, _s2) => new Set([..._s1, ..._s2])
    );
  }

  handleUndefined(s1, s2, operation) {
    const s1Type = typeof s1,
      s2Type = typeof s2;
    if (s1Type === 'undefined') return operation([], s2);
    if (s2Type === 'undefined') return operation(s1, []);
    if (s1Type === 'undefined' && s2Type === 'undefined') return null;
    return operation(s1, s2);
  }
}

module.exports = DataStore;
