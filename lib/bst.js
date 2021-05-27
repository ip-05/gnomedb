const Node = require('./node.js');

class BinarySearchTree {
  constructor(options = {}) {
    this.root = null;
    this.fieldKey = options.fieldKey;
    this.compareKeys = options.compareKeys || this.compareKeys;
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
    const treeRecursion = (node) => {
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

    // проходит путь от начала до места вставки элемента
    // записывает данные о вершинах
    const balanceInfo = (arr) => {
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
    const hasUnbalanced = (arr) => {
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

    // если не сбалансированы, смотрим на turns
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
        console.log('оппа');
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
      // return checkRotation(arr, nextUnbalancedId);
    };
    checkRotation(road, unbalancedId);
    return this;
  }

  rotateRR(parent, startNode) {
    /**
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
      parent.left = b;
    }
    b.right = a;
    a.left = null;
    return this;
  }

  addFrom(obj) {
    const type = typeof obj;
    if (!obj || type !== 'object') return new Error('Collection of Objects was expected!');

    const length = Object.keys(obj).length || obj.length; // object or array
    if (!length) return new Error('Object must have a non-zero length!');

    const keys = Object.keys(obj);
    for (const key of keys) {
      const node = obj[key];
      this.add(node);
    }
    return this;
  }

  remove(data) {
    let lastBranch = '';
    const removeData = (data, node, prevNode = null) => {
      if (!node) return null;
      if (node.key === data[this.fieldKey]) {
        if (node.data.has(data)) {
          node.data.delete(data);
          if (!node.data.size) {
            const allData = findSubData(node);
            prevNode[lastBranch] = null;
            allData.forEach((el) => this.add(el));
          }
        } else {
          console.log('There is no such data for this key');
        }
      } else {
        const check = node.left && data[this.fieldKey] < node.key;
        lastBranch = check ? 'left' : 'right';
        removeData(data, check ? node.left : node.right, node);
      }
    };

    const findSubData = (forNode) => {
      const datas = [];
      const find = (node) => {
        if (node.left) {
          node.left.data.forEach((el) => {
            datas.push(el);
          });
          find(node.left);
        }
        if (node.right) {
          node.right.data.forEach((el) => {
            datas.push(el);
          });
          find(node.right);
        }
      };
      find(forNode);
      return datas;
    };
    removeData(data, this.root);
  }

  findByKey(key) {
    const treeRecursion = (node) => {
      const compare = BinarySearchTree.compareKeys(key, node.key);
      if (compare > 0) {
        return treeRecursion(node.right);
      }
      if (compare < 0) {
        return treeRecursion(node.left);
      }
      return node;
    };
    return treeRecursion(this.root);
  }

  recurseTree(direction, node) {
    const tempNode = direction === 'left' ? node.left : node.right;
    if (node && !tempNode) {
      return node;
    }
    return this.recurseTree(direction, tempNode);
  }

  getHeight(node) {
    // if node passed, getHeight of it
    if (node !== undefined) {
      if (node) return node.getHeight();
      return -1;
    }

    // if no arguments, getHight of tree
    const { root } = this;
    if (!root) return -1;
    return root.getHeight();
  }

  balanceOf(node) {
    if (node !== undefined) {
      if (!node) return new Error('Can not get balance of non-existent node!');
      const { left, right } = node;
      const heightLeft = this.getHeight(left);
      const heightRight = this.getHeight(right);
      return heightLeft - heightRight;
    }
    return new Error('Can not get balance of nothing. Node was expected!');
  }

  isBalanced(node = this.root) {
    if (!node) return new Error('Tree has no nodes!');
    // B(H) = |Hl(H) - Hr(H)| <= 1
    const balanceFactor = this.balanceOf(node);
    return Math.abs(balanceFactor) <= 1;
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

  static compareKeys(a, b) {
    const [typeA, typeB] = [typeof a, typeof b];
    if (typeA === 'number' && typeB === 'number') {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    }
    if (typeA === 'string' && typeB === 'string') {
      return a.toString().localeCompare(b.toString());
    }
    return new Error('Parameters must be both type of String or Number!');
  }
}

module.exports = BinarySearchTree;
