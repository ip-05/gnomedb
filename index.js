'use strict';

const BinarySearchTree = require('./lib/bst.js');

const tree = new BinarySearchTree({ fieldKey: 'id' });

tree.add({ id: 0, name: 'Yevgen' });
tree.add({ id: 1, name: 'Jenya' });
tree.add({ id: -55, name: 'Jenya' });
tree.add({ id: 9, name: 'Jenya' });
tree.add({ id: 5, name: 'Jenya' });
tree.add({ id: 25, name: 'Jenya' });

console.dir({ tree }, { depth: 100 });