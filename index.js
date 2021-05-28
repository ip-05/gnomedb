const BinarySearchTree = require('./lib/bst.js');

const tree = new BinarySearchTree({ fieldKey: 'num' });

// const node40 = tree.add({ num: 40 });
// const node20 = tree.add({ num: 20 });
// const node10 = tree.add({ num: 10 });
// const node25 = tree.add({ num: 25 });
// const node30 = tree.add({ num: 30 });
// const node22 = tree.add({ num: 22 });
// const node50 = tree.add({ num: 50 });

// const h = tree.getHeight();
// console.log(h);

// const b = tree.balanceOf(node40);
// console.log(b);

// const isB = tree.isBalanced();
// console.log(isB);

tree.add({ num: 40 });
tree.add({ num: 20 });
tree.add({ num: 10 });
tree.add({ num: 25 });
tree.add({ num: 30 });
// tree.add({ num: 22 });
// tree.add({ num: 50 });

// console.dir({ tree }, { depth: null });
