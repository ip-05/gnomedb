export = BinarySearchTree;
declare class BinarySearchTree {
    static compareKeys(a: any, b: any): any;
    constructor(options?: {});
    root: Node;
    fieldKey: any;
    add(data: any): any;
    addFrom(obj: any): BinarySearchTree;
    remove(data: any): void;
    getHeight(node: any): any;
    findByKey(key: any): Cursor;
    filterLessThan(val: any, equal?: boolean): Cursor;
    filterGreaterThan(val: any, equal?: boolean): Cursor;
}
import Node = require("./node.js");
import Cursor = require("./cursor.js");
