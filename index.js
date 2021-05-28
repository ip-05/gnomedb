'use strict';

const DataStore = require('./lib/store.js');
const db = new DataStore();

db.index('age');
db.index('name');
db.index('city');

const luke = db.add({ name: 'Luke', age: 17, city: 'Amsterdam' });
const bob = db.add({ name: 'Bob', age: 18, city: 'Paris' });
const joe = db.add({ name: 'Joe', age: 19, city: 'Warsaw' });
const mary = db.add({ name: 'Mary', age: 20, city: 'Warsaw' });
const dan = db.add({ name: 'Dan', age: 20, city: 'London' });
const asdf = db.add({ name: 'asdf', age: 13, city: 'Amsterdam' });

const lessThan18 = db.find({ age: { $lt: 18 } });
const greaterThan18 = db.find({ age: { $gte: 18 } });
const amsterdam = db.find({ city: 'Amsterdam' });

console.log(lessThan18);
console.log(greaterThan18);
console.log(amsterdam);