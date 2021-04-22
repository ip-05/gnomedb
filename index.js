'use strict';

const DataStore = require('./lib/store.js');

const db = new DataStore();

db.insert({ name: 'Jenya', age: 18 });

const me1 = db.select({ name: 'Jenya' });

console.log(me1);