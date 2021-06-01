'use strict';

const BinarySearchTree = require('./bst.js');
const uuid = require('./utils.js');

class DataStore {
  constructor(options = {}) {
    this.defaultFieldKey = options.defaultFieldKey || '_id';
    this.indeces = new Map();
    this.init();
  }

  init() {
    this.index(this.defaultFieldKey);
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

  remove(doc) {
    for (const [_, idx] of this.indeces) {
      idx.remove(doc);
    }
  }

  find(query) {
    let vertices;
    const keys = Object.keys(query);
    for (const key of keys) {
      const index = this.indeces.get(key);
      if (index) {
        const subQuery = query[key];
        if (typeof subQuery === 'object') {
          const subQueryKeys = Object.keys(subQuery);
          for (const subQueryKey of subQueryKeys) {
            if (subQueryKey === '$gt') {
              const greaterThan = index
                .getNodesGreaterThan(subQuery[subQueryKey])
                .getData();
              const intersection = this.intersection(vertices, greaterThan);
              vertices = vertices ? intersection : greaterThan;
            } else if (subQueryKey === '$lt') {
              const lessThan = index
                .getNodesLessThan(subQuery[subQueryKey])
                .getData();
              const intersection = this.intersection(vertices, lessThan);
              vertices = vertices ? intersection : lessThan;
            } else if (subQueryKey === '$gte') {
              const greaterThan = index
                .getNodesGreaterThan(subQuery[subQueryKey])
                .getData();
              const equal = index.findByKey(subQuery[subQueryKey]).getData();
              const gte = this.union(greaterThan, equal);
              const intersection = this.intersection(vertices, gte);
              vertices = vertices ? intersection : gte;
            } else if (subQueryKey === '$lte') {
              const lessThan = index
                .getNodesLessThan(subQuery[subQueryKey])
                .getData();
              const equal = index.findByKey(subQuery[subQueryKey]).getData();
              const lte = this.union(lessThan, equal);
              const intersection = this.intersection(vertices, lte);
              vertices = vertices ? intersection : lte;
            }
          }
        } else {
          const records = index.findByKey(subQuery).getData();
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
    return DataStore.handleUndefined(
      s1,
      s2,
      (_s1, _s2) => new Set([..._s1].filter(data => _s2.has(data)))
    );
  }

  union(s1, s2) {
    return DataStore
      .handleUndefined(s1, s2, (_s1, _s2) => new Set([..._s1, ..._s2]));
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
