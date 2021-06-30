'use strict';

const assert = require('assert').strict;
const BinarySearchTree = require('../lib/bst.js');

describe('Binary Search Tree', () => {
  it('should add', () => {
    const tree = new BinarySearchTree({ fieldKey: 'name' });
    const data = { name: 'OgnomDB' };
    tree.add(data);
    assert.deepStrictEqual(tree.root.data, new Set([data]));
  });

  it('should remove', () => {
    const tree = new BinarySearchTree({ fieldKey: 'name' });
    const data = { name: 'OgnomDB' };
    tree.add(data);
    tree.remove(data);
    assert.deepStrictEqual(tree.root, null);
  });

  it('should sort', () => {
    const tree = new BinarySearchTree({ fieldKey: 'age' });
    tree.add({ age: '18' });
    tree.add({ age: '17' });
    tree.add({ age: '19' });
    assert.deepStrictEqual(tree.root.key, '18');
    assert.deepStrictEqual(tree.root.left.key, '17');
    assert.deepStrictEqual(tree.root.right.key, '19');
  });
});
