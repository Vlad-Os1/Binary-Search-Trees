class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array = []) {
    this.sortedArray = [...new Set(array.sort((a, b) => a - b))];
    this.root = this.buildTree(this.sortedArray);
  }

  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) {
      return null;
    }
    let middle = start + Math.floor((end - start) / 2);
    let root = new Node(array[middle]);
    root.left = this.buildTree(array, start, middle - 1);
    root.right = this.buildTree(array, middle + 1, end);
    return root;
  }

  insert(value) {
    let newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
    }
    let current = this.root;
    while (true) {
      if (value === current.data) return;
      if (value < current.data) {
        if (current.left === null) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }
  deleteItem(value) {
    let nodeToDelete = this.find(value);
    let current = this.root;
    let parent = this.root;
    while (parent !== null) {
      if (parent.right === nodeToDelete || parent.left === nodeToDelete) {
        break;
      }
      if (nodeToDelete.data > parent.data) {
        parent = parent.right;
      } else {
        parent = parent.left;
      }
    }
    console.log(parent);
  }
  find(value) {
    if (this.root === null) {
      return null;
    }
    let current = this.root;
    while (current !== null) {
      if (value === current.data) {
        return current;
      }
      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    throw new Error('This value is not in the tree');
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

let array = [0, 1, 1, 2, 9, 3, 10, 4, 5, 6];
let tree = new Tree(array);
tree.insert(7);
prettyPrint(tree.root);
console.log(tree.deleteItem(5));
