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
    findByKey(key: any): any;
    getNodesLessThan(val: any): Cursor;
    getNodesGreaterThan(val: any): Cursor;
}
import Node = require("./node.js");
import Cursor = require("./cursor.js");
