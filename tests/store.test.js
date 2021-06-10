'use strict';

const assert = require('assert').strict;
const Store = require('../lib/store.js');

const data = [
  { name: 'Marcus Aurelius', city: 'Rome', born: 121, dynasty: 'Antonine' },
  { name: 'Lucius Verus', city: 'Rome', born: 130, dynasty: 'Antonine' },
  {
    name: 'Antoninus Pius',
    city: 'Lanuvium',
    born: 86,
    dynasty: 'Antonine',
  },
  {
    name: 'Hadrian',
    city: 'Santiponce',
    born: 76,
    dynasty: 'Nerva–Trajan',
  },
  { name: 'Trajan', city: 'Sevilla', born: 98, dynasty: 'Nerva–Trajan' },
];

describe('Data Store', () => {
  it('should add', () => {
    const store = new Store();
    const entry = store.add({ age: 15, city: 'Kyiv' });
    const index = store.indeces.get('age');
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

  it('should find gte', () => {
    const store = new Store();
    const [marcus, lucius] = store.addFrom(data);
    const result = store.find({ born: { $gte: 121 } });
    assert.deepStrictEqual(result, new Set([marcus, lucius]));
  });

  it('should find gt', () => {
    const store = new Store();
    const [marcus, lucius] = store.addFrom(data);
    const result = store.find({ born: { $gt: 98 } });
    assert.deepStrictEqual(result, new Set([marcus, lucius]));
  });

  it('should find exact match', () => {
    const store = new Store();
    const [marcus] = store.addFrom(data);
    const result = store.find({ name: 'Marcus Aurelius' });
    assert.deepStrictEqual(result, new Set([marcus]));
  });
});
