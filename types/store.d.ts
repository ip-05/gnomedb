export = DataStore;
declare class DataStore {
  constructor(options?: {});
  defaultFieldKey: any;
  indeces: any;
  filterTree: {};
  init(): DataStore;
  index(fieldKey: any): DataStore;
  add(data: any): DataStore;
  addFrom(obj: any): DataStore;
  remove(doc: any): void;
  find(query: any): any;
  intersection(s1: any, s2: any): any;
  union(s1: any, s2: any): any;
  handleUndefined(s1: any, s2: any, operation: any): any;
}
