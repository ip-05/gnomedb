'use strict';

const BinarySearchTree = require('./lib/bst.js');

const tree = new BinarySearchTree({ fieldKey: 'city' });

tree.add({ _id: 0, name: 'Jenya', city: 'Kyiv' });
tree.add({ _id: 1, name: 'Jenya2', city: 'Kyiv' });
tree.add({ _id: 2, name: 'Jenya3', city: 'Kyiv' });
tree.add({ _id: 3, name: 'Jenya4', city: 'Lviv' });

const treeMin = tree.findMin();
const treeMax = tree.findMax();

console.dir({ treeMin });
console.dir({ treeMax });

console.dir({ tree }, { depth: null });

const foundByKey = tree.findByKey( 'Kyiv' );

console.dir({foundByKey});