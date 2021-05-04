'use strict';

const BinarySearchTree = require('./lib/bst.js');

const tree = new BinarySearchTree({ fieldKey: 'city' });

const users = {
    default : { _id: 0, name: 'default', city: 0 },
    // Jenya : { _id: 1, name: 'Jenya', city: 12 },
    Alina : { _id: 2, name: 'Alina', city: -2 },
    // Artem : { _id: 3, name: 'Artem', city: 1 },
    Ivan : { _id: 4, name: 'Ivan', city: -4 },
    Nick : { _id: 5, name: 'Nick', city: 4 },
    Mary : { _id: 6, name: 'Mary', city: 2 },
    hol : { _id: 6.5, name: 'hol', city: 1 },
    kol : { _id: 6.7, name: 'kol', city: 3 },
    Ann : { _id: 7, name: 'Ann', city: 6 },
    Kate : { _id: 8, name: 'Kate', city: 5 },
    Kolya : { _id: 9, name: 'Kolya', city: 7 },
    Dima : { _id: 10, name: 'Dima', city: -1 },
}

for(let name in users) {
    tree.add(users[name]);
}

// const treeMin = tree.findMin();
// const treeMax = tree.findMax();

tree.remove(users.Nick);
console.log(tree.root.right.right);

// console.dir({ treeMin });
// console.dir({ treeMax });

// console.dir({ tree }, { depth: null });

// const foundByKey = tree.findByKey( 'Kyiv' );

// console.dir({foundByKey});