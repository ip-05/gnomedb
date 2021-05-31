'use strict';

class DataStore {
  constructor(options = {}) {
    this.defaultFieldIndex = options.defaultFieldIndex || '_id';
  }

  // add(doc)

  // remove(doc)

  // find(query)

  intersection(s1, s2) {
    return this._handleUndefined(s1, s2, (_s1, _s2) => new Set([..._s1].filter(data => _s2.has(data))));
  }

  union(s1, s2) {
    return this._handleUndefined(s1, s2, (_s1, _s2) => new Set([..._s1, ..._s2]));
  }
  
  _handleUndefined(s1, s2, operation) {
    const s1Type = typeof s1, s2Type = typeof s2;
    if (s1Type === 'undefined') return s2;
    if (s2Type === 'undefined') return s1;
    if (s1Type === 'undefined' && s2Type === 'undefined') return null;
    return operation(s1, s2);
  }
}

module.exports = DataStore;
