export = DataStore;
declare class DataStore {
    constructor(options?: {});
    defaultFieldKey: any;
    indeces: any;
    init(): void;
    index(fieldKey: any): void;
    find(query: any): any;
    add(doc: any): any;
    remove(doc: any): void;
    intersection(s1: any, s2: any): any;
    union(s1: any, s2: any): any;
    prepareDocument(doc: any): any;
}
