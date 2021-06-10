export = Node;
declare class Node {
    constructor(key: any, data: any);
    key: any;
    data: any;
    left: any;
    right: any;
    getHeight(node?: Node): any;
    getChildren(node?: Node): any;
}
