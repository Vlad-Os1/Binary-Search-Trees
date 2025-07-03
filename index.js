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
      return;
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
    let parent = this.findParent(nodeToDelete);

    // delete when nodeToDelete has both children
    if (nodeToDelete.left !== null && nodeToDelete.right !== null) {
      let successor = nodeToDelete.right;
      while (successor.left !== null) {
        successor = successor.left;
      }
      let successorParent = this.findParent(successor);
      nodeToDelete.data = successor.data;
      if (successor.data === successorParent.right.data) {
        successorParent.right = successor.right;
      } else {
        successorParent.left = successor.right;
      }
      return;
    }
    // delete when nodeToDelete has only one children
    if (nodeToDelete.left !== null || nodeToDelete.right !== null) {
      let child =
        nodeToDelete.left !== null ? nodeToDelete.left : nodeToDelete.right;
      if (nodeToDelete === this.root) {
        this.root = child;
        return;
      }
      if (parent.left === nodeToDelete) {
        parent.left = child;
      } else {
        parent.right = child;
      }
      return;
    }
    // delete when nodeToDelete does'nt have children
    if (nodeToDelete.left === null && nodeToDelete.right === null) {
      if (nodeToDelete === this.root) {
        this.root = null;
        return;
      }
      if (nodeToDelete === parent.right) {
        parent.right = null;
      } else {
        parent.left = null;
      }
      return;
    }
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
  findParent(node) {
    let parent = this.root;
    if (node === this.root) {
      return null;
    }
    while (parent !== null) {
      if (parent.right === node || parent.left === node) {
        break;
      }
      if (node.data > parent.data) {
        parent = parent.right;
      } else {
        parent = parent.left;
      }
    }
    return parent;
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
tree.insert(3.1);
tree.insert(2.6);
tree.insert(2.6);
tree.deleteItem(4);
prettyPrint(tree.root);
