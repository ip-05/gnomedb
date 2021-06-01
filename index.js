'use strict';

const Store = require('./lib/store.js');

const db = new Store().index('age');

db.add({ age: 18 });
db.add({ age: 22 });
db.add({ age: 11 });
db.add({ age: 20 });
db.add({ age: 12 });
db.add({ age: 19 });

const res = db.find({ age: { $gt: 15, $lt: 20 } });

console.log(res);

/*
 *
 * THIS FILE IS FOR TESTING YOUR CHANGES
 * THIS SHOULD NOT BE COMMITED!!!
 *
 */

//console.dir({ db }, { depth: null });
