'use strict';

class Utils {
  static compareKeys(a, b) {
    const [typeA, typeB] = [typeof a, typeof b];
    if (typeA === 'number' && typeB === 'number') {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    }
    if (typeA === 'string' && typeB === 'string') {
      return a.localeCompare(b);
    }
    throw new Error('Parameters must be both type of String or Number!');
  }

  static uuid() {
    return 'xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx'
      .replace(/[xN]/g, char => {
        const rand = (Math.random() * 16) | 0;
        return (char === 'x' ? rand : (rand & 0x3) | 0x8).toString(16);
      })
      .replace(/M/, () => ((Math.random() * 5 + 1) | 0).toString(16));
  }

  static intersection(s1, s2) {
    return this.handleUndefined(
      s1,
      s2,
      (_s1, _s2) =>
        new Set([..._s1].filter(data => new Set([..._s2]).has(data)))
    );
  }

  static union(s1, s2) {
    return this.handleUndefined(
      s1,
      s2,
      (_s1, _s2) => new Set([..._s1, ..._s2])
    );
  }

  static handleUndefined(s1, s2, operation) {
    const s1Type = typeof s1,
      s2Type = typeof s2;
    if (s1Type === 'undefined') return operation([], s2);
    if (s2Type === 'undefined') return operation(s1, []);
    if (s1Type === 'undefined' && s2Type === 'undefined') return null;
    return operation(s1, s2);
  }
}

module.exports = Utils;
