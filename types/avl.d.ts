export = AVLTree;
declare class AVLTree extends BinarySearchTree {
    rotateRR(parent: any, startNode: any): AVLTree;
    balanceOf(node: any): number;
    isBalanced(node?: Node): boolean;
    recurseTree(direction: any, node: any): any;
    findMinHeight(node?: Node): any;
    findMaxHeight(node?: Node): any;
    findMin(): any;
    findMax(): any;
}
import BinarySearchTree = require("./bst.js");
import Node = require("./node.js");
