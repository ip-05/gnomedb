'use strict';

const BinarySearchTree = require('./bst.js');
const { generateUUID } = require('./utils.js');

class DataStore {
  constructor(options = {}) {
    this.defaultFieldKey = options.defaultFieldKey || '_id';
    this.indeces = new Map();
    this.init();
  }

  init() {
    this.index(this.defaultFieldKey);
  }

  index(fieldKey) {
    const fieldIndex = new BinarySearchTree({ fieldKey });
    this.indeces.set(fieldKey, fieldIndex);
  }

  find(query) {
    let vertices;
    const keys = Object.keys(query);
    for (const key of keys) {
      const index = this.indeces.get(key);
      if (index) {
        const subQuery = query[key]; // Warsaw
        if (typeof subQuery === 'object') {
          const subQueryKeys = Object.keys(subQuery);
          for (const subQueryKey of subQueryKeys) {
            if (subQueryKey === '$gt') {
              const greaterThan = index.getNodesGreaterThan(subQuery[subQueryKey]).getData();
              const intersection = this.intersection(vertices, greaterThan);
              vertices = vertices ? intersection : greaterThan;
            } else if (subQueryKey === '$lt') {
              const lessThan = index.getNodesLessThan(subQuery[subQueryKey]).getData();
              const intersection = this.intersection(vertices, lessThan);
              vertices = vertices ? intersection : lessThan;
            } else if (subQueryKey === '$gte') {
              // greater than equal
            } else if (subQueryKey === '$lte') {
              // less than equal
            } else if (subQueryKey === '$has') {
              // has in array
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

  add(doc) {
    const preparedDocument = this.prepareDocument(doc);
    for (const [_, idx] of this.indeces) {
      idx.add(preparedDocument);
    }
    return preparedDocument;
  }

  remove(doc) {
    for (const [_, idx] of this.indeces) {
      idx.remove(doc);
    }
  }

  intersection(s1, s2) {
    return this._handleUndefined(s1, s2, (_s1, _s2) => new Set([..._s1].filter(v => _s2.has(v))));
  }

  union(s1, s2) {
    return this._handleUndefined(s1, s2, (_s1, _s2) => new Set([..._s1, ..._s2]));
  }

  prepareDocument(doc) {
    const uuid = generateUUID();
    const defaultIndex = this.indeces.get(this.defaultFieldKey);
    if (defaultIndex.root) {
      if (!defaultIndex.findByKey(uuid)) {
        doc[this.defaultFieldKey] = uuid;
        return doc;
      } else {
        this.prepareDocument(doc);
      }
    } else {
      doc[this.defaultFieldKey] = uuid;
      return doc;
    }
  }

  _handleUndefined(s1, s2, op) {
    const s1Type = typeof s1;
    const s2Type = typeof s2;
    if (s1Type === 'undefined') {
      return s2;
    } else if (s2Type === 'undefined') {
      return s1;
    } else if (s1Type === 'undefined' && s2Type === 'undefined') {
      return null;
    } else {
      return op(s1, s2);
    }
  }
}

module.exports = DataStore;