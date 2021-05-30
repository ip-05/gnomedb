'use strict';

const BinarySearchTree = require('./bst.js');
const Node = require('./node.js');

class AVLTree extends BinarySearchTree {
  constructor(options = {}) {
    super(options);
  }

  add(data) {
    const key = data[this.fieldKey];
    const newNode = new Node(key, new Set([data]));
    if (!this.root) {
      this.root = newNode;
      return newNode;
    }

    const turns = [];
    const road = [];
    const vertices = [];
    const treeRecursion = node => {
      const compare = BinarySearchTree.compareKeys(key, node.key);
      if (compare > 0) {
        road.push(node);
        vertices.push(node);
        turns.push('R');
        if (!node.right) {
          node.right = newNode;
          road.push(newNode);
          vertices.push(newNode);
          return newNode;
        }
        return treeRecursion(node.right);
      }
      if (compare < 0) {
        road.push(node);
        vertices.push(node);
        turns.push('L');
        if (!node.left) {
          node.left = newNode;
          road.push(newNode);
          vertices.push(newNode);
          return newNode;
        }
        return treeRecursion(node.left);
      }
      node.data.add(data);
      return node;
    };
    treeRecursion(this.root);
    // console.dir({ turns, road, vertices });

    // проходит путь от начала до места вставки элемента
    // записывает данные о вершинах
    const balanceInfo = arr => {
      for (let i = 0; i < arr.length; i += 1) {
        const vertexNode = vertices[i];
        arr[i] = {
          node: vertexNode,
          nextStep: turns[i],
          isBalanced: this.isBalanced(vertexNode),
        };
      }
      return arr;
    };
    balanceInfo(road);
    console.log(road);

    // проверяет есть ли несбалансированные вершины
    const hasUnbalanced = arr => {
      const revArr = [...arr].reverse();
      const { length } = revArr;
      for (let i = 0; i < length; i += 1) {
        const vertex = revArr[i];
        if (vertex.isBalanced === false) {
          return { has: true, unbalancedId: length - 1 - i };
        }
      }
      return { has: false, unbalancedId: null };
    };
    const { has, unbalancedId } = hasUnbalanced(road);

    console.log({ has, unbalancedId });

    // если все вершины сбалансированы то выходим
    if (!has) return this;

    // // если не сбалансированы, смотрим на turns
    const checkRotation = (arr, unbalId) => {
      const parentCheck = unbalId === 0 && arr[unbalId].node === this.root;
      const parentNode = parentCheck ? null : arr[unbalId - 1].node;
      const startNode = arr[unbalId].node;
      const type = turns[unbalId] + turns[unbalId + 1];
      if (type === 'LL') {
        this.rotateRR(parentNode, startNode);
      } else if (type === 'RR') {
        // do Left rotateLL();
      } else if (type === 'LR') {
        // console.log('оппа');
        // do Left-Right rotateLR();
      } else if (type === 'RL') {
        // do Right-Left rotateRL();
      }

      // обновляю данные по посещенным вершинам
      balanceInfo(arr);
      const { stillHasUnbalanced, nextUnbalancedId } = hasUnbalanced(arr);

      // если все сбалансированы то выходим
      if (!stillHasUnbalanced) return this;

      // если еще остались не сбалансированы, идем еще раз (рекурсия)
      return checkRotation(arr, nextUnbalancedId);
    };
    checkRotation(road, unbalancedId);
    return this;
  }

  rotateRR(parent, startNode) {
    /*
     * Right Rotation
     *
     *     (p)
     *      |
     *      a    (p)
     *     /      |
     *    b       b
     *   /       / \
     *  c       c   a
     *
     */
    const a = startNode;
    const b = startNode.left;
    const c = startNode.left.left;
    if (parent === null) {
      // Начальный startNode и есть this.root
      this.root = b;
    } else if (parent.left === startNode) {
      parent.left = b;
    } else if (parent.right === startNode) {
      parent.right = b;
    }
    b.right = a;
    a.left = null;
    return this;
  }

  balanceOf(node) {
    if (node !== undefined) {
      if (!node) {
        throw new Error('Can not get balance of non-existent node!');
      }
      const { left, right } = node;
      const heightLeft = this.getHeight(left);
      const heightRight = this.getHeight(right);
      return heightLeft - heightRight;
    }
    throw new Error('Can not get balance of nothing. Node was expected!');
  }

  isBalanced(node = this.root) {
    if (!node) {
      throw new Error('Tree has no nodes!');
    }
    // B(H) = |Hl(H) - Hr(H)| <= 1
    const balanceFactor = this.balanceOf(node);
    return Math.abs(balanceFactor) <= 1;
  }

  recurseTree(direction, node) {
    const tempNode = direction === 'left' ? node.left : node.right;
    if (node && !tempNode) {
      return node;
    }
    return this.recurseTree(direction, tempNode);
  }

  findMinHeight(node = this.root) {
    if (!node) return -1;
    const left = this.findMinHeight(node.left);
    const right = this.findMinHeight(node.right);
    if (left < right) {
      return left + 1;
    }
    return right + 1;
  }

  findMaxHeight(node = this.root) {
    if (!node) return -1;
    const left = this.findMinHeight(node.left);
    const right = this.findMinHeight(node.right);
    if (left > right) {
      return left + 1;
    }
    return right + 1;
  }

  findMin() {
    return this.recurseTree('left', this.root);
  }

  findMax() {
    return this.recurseTree('right', this.root);
  }
}

module.exports = AVLTree;
