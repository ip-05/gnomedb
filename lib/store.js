class DataStore {
  constructor(options = {}) {
    this.randomFieldIndex = options.randomFieldIndex | '_id';
    this.indeces = new Set();

    this.init();
  }

  index(key) {
    
  }

  init() {
    this.index(this.randomFieldIndex);
  }
}