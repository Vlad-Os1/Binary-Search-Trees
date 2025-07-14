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
  levelOrder(callback) {
    if (!this.root) return [];
    let queue = [this.root];
    while (queue.length > 0) {
      const current = queue.shift();
      if (callback) {
        callback(current);
      } else {
        throw new Error('Callback is required');
      }
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }
    return;
  }
  preOrder(node, callback) {
    if (!callback) throw new Error('Callback is required');
    if (node === null) return;

    callback(node);
    this.preOrder(node.left, callback);
    this.preOrder(node.right, callback);
  }
  inOrder(node, callback) {
    if (!callback) throw new Error('Callback is required');
    if (node === null) return;

    this.inOrder(node.left, callback);
    callback(node);
    this.inOrder(node.right, callback);
  }
  postOrder(node, callback) {
    if (!callback) throw new Error('Callback is required');
    if (node === null) return;

    this.postOrder(node.left, callback);
    this.postOrder(node.right, callback);
    callback(node);
  }
  height(value) {
    let node = this.find(value);
    let computeHeight = (node) => {
      if (!node) return -1;
      return 1 + Math.max(computeHeight(node.left), computeHeight(node.right));
    };
    computeHeight(node);
    console.log(computeHeight(node));
  }

  depth(value) {
    let node = this.find(value);
    let depth = 0;
    let current = this.root;
    while (current !== node) {
      if (node.data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
      depth++;
    }
    return depth;
  }
  isBalanced() {
    let check = (node = this.root) => {
      if (node === null) return 0;
      let left = node.left;
      let right = node.right;

      let leftHeight = check(left);
      let rightHeight = check(right);

      if (Math.abs(leftHeight - rightHeight) > 1) return -1;

      return 1 + Math.max(leftHeight, rightHeight);
    };
    return check() !== -1;
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}

let array = [0, 1, 1, 2, 9, 3, 10, 4, 5, 6];
let tree = new Tree(array);
tree.prettyPrint();

console.log(tree.isBalanced());
