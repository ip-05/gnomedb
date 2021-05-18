export = BinarySearchTree;
declare class BinarySearchTree {
    constructor(options?: {});
    root: Node;
    fieldKey: any;
    compareKeys: number;
    add(data: any): any;
    remove(data: any): void;
    getHeight(): any;
    findByKey(key: any): any;
    recurseTree(direction: any, node: any): any;
    isBalanced(): boolean;
    findMinHeight(node?: Node): any;
    findMaxHeight(node?: Node): any;
    findMin(): any;
    findMax(): any;
    _compareKeys(a: any, b: any): any;
}
declare class Node {
    constructor(key: any, data: any);
    key: any;
    data: any;
    left: any;
    right: any;
    getHeight(node?: Node): any;
}
