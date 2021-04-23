'use strict';

const BinarySearchTree = require('./lib/bst.js');

const tree = new BinarySearchTree({ fieldKey: 'id' });

tree.add({ id: -75, name: 'Yevgen' });
tree.add({ id: -25, name: 'Yevgen' });
tree.add({ id: -50, name: 'Yevgen' });
tree.add({ id: 0, name: 'Yevgen' });
tree.add({ id: 50, name: 'Yevgen' });
tree.add({ id: 75, name: 'Yevgen' });
tree.add({ id: 100, name: 'Yevgen' });

console.dir({ tree }, { depth: null });