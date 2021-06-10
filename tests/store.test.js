'use strict';

const assert = require('assert').strict;
const Store = require('../lib/store.js');

describe('Data Store', () => {
  it('should add', () => {
    const store = new Store();
    const entry = store.add({ age: 15, city: 'Kyiv' });
    const index = store.indeces.get('age', 'city');
    assert.deepStrictEqual(index.root.data, new Set([entry]));
  });

  it('should index', () => {
    const store = new Store();
    const entry = store.add({ age: 15, city: 'Kyiv' });
    const indexAge = store.indeces.get('age');
    const indexCity = store.indeces.get('city');
    assert.deepStrictEqual(indexAge.root.data, new Set([entry]));
    assert.deepStrictEqual(indexCity.root.data, new Set([entry]));
  });

  it('should remove', () => {
    const store = new Store();
    const entry = store.add({ age: 15, city: 'Kyiv' });
    const index = store.indeces.get('age', 'city');
    assert.deepStrictEqual(index.root.data, new Set([entry]));
    store.remove(entry);
    assert.deepStrictEqual(null, index.root);
  });
});
