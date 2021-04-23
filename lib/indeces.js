const BinarySearchTree = require("./bst");

class Index {
  constructor(options = {}) {
    this.unique = options.unique;
    this.fieldName = options.fieldName;

    this.init();
  }

  init() {
    this.tree = new BinarySearchTree({ fieldName: this.fieldName });
  }
}