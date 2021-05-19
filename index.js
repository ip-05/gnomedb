'use strict';

const DataStore = require('./lib/store.js');
const db = new DataStore();

db.index('age');
db.index('city');
db.index('name');

const luke = db.add({ name: 'Luke', age: 17, city: 'Amsterdam' });
const bob = db.add({ name: 'Bob', age: 18, city: 'Paris' });
const joe = db.add({ name: 'Joe', age: 19, city: 'Warsaw' });
const mary = db.add({ name: 'Mary', age: 20, city: 'Warsaw' });
const dan = db.add({ name: 'Dan', age: 20, city: 'London' });

const greaterThanEqualTo18 = db.find({ age: { $gte: 18 } });
const greaterThan18 = db.find({ age: { $gt: 18 } });
const warsaw = db.find({ city: 'Warsaw' });

console.dir({ greaterThanEqualTo18 }, { depth: null });
console.dir({ greaterThan18 }, { depth: null });
console.dir({ warsaw }, { depth: null });