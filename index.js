'use strict';

const BinarySearchTree = require('./lib/bst.js');

const tree = new BinarySearchTree({ fieldKey: 'city' });

// tree.add({ _id: 0, name: 'Jenya', city: 'Kyiv' });
// tree.add({ _id: 1, name: 'Jenya2', city: 'Kyiv' });
// tree.add({ _id: 2, name: 'Jenya3', city: 'Kyiv' });
// tree.add({ _id: 3, name: 'Jenya4', city: 'Lviv' });

const users = {
    default : { _id: 0, name: 'default', city: 'London' },
    // Jenya : { _id: 1, name: 'Jenya', city: 12 },
    Alina : { _id: 2, name: 'Alina', city: 'Odesa' },
    // Artem : { _id: 3, name: 'Artem', city: 1 },
    Ivan : { _id: 4, name: 'Ivan', city: 'Orekhov' },
    Nick : { _id: 5, name: 'Nick', city: 'Kyiv' },
    Mary : { _id: 6, name: 'Mary', city: 'London' },
    Ann : { _id: 7, name: 'Ann', city: 'Cherkassi' },
}

for(let name in users) {
    tree.add(users[name]);
}

// const treeMin = tree.findMin();
// const treeMax = tree.findMax();

tree.remove(users.Nick);
console.log(tree.root);

// const treeMin = tree.findMin();
// const treeMax = tree.findMax();

// console.dir({ treeMin });
// console.dir({ treeMax });

// console.dir({ tree }, { depth: null });

// const foundByKey = tree.findByKey( 'Kyiv' );

// console.dir({foundByKey});