// Binary search tree - javascript implementation.
// s3sivaram@gmail.com - 3-Jun-2022
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
  show() {
    console.log(`Left= ${this.left} Node(${this.data}) right= ${this.right}`);
  }
}
// ----------BST Class starts....
class BST {
  constructor() {
    this.root = null;
  }
  insert(data) {
    if (this.root) {
      this.#Binsert(this.root, data);
    } else {
      this.root = new Node(data);
    }
  }
  #Binsert(node, data) {
    if (data == node.data) {
      console.log("duplicate data");
      return;
    }
    if (node.data > data) {
      if (node.left) {
        node = node.left;
        this.#Binsert(node, data);
      } else {
        node.left = new Node(data);
        // console.log(`inserted left=${data}`);
      }
    } else {
      if (node.right) {
        node = node.right;
        this.#Binsert(node, data);
      } else {
        node.right = new Node(data);
        // console.log(`inserted right=${data}`);
      }
    }
  }
  inOrderTraversal() {
    //  traverse through the binary tree and print it.
    console.log("inOrder Traversal");
    if (this.root) {
      this.#recurinorderTraverse(this.root);
    } else {
      console.log("Tree is empty");
    }
    console.log("----------------");
  }

  #recurinorderTraverse(node) {
    // helper function to traverse inorder through out the tree.
    if (node) {
      this.#recurinorderTraverse(node.left);
      console.log(node.data);
      this.#recurinorderTraverse(node.right);
    }
  }
  postOrderTraversal() {
    // post traverse through the binary tree and print it.
    console.log("postOrder Traversal");
    if (this.root) {
      this.#recurpostorderTraverse(this.root);
    } else {
      console.log("Tree is empty");
    }
    console.log("----------------");
  }

  #recurpostorderTraverse(node) {
    // helper function to traverse postorder through out the tree.
    if (node) {
      this.#recurpostorderTraverse(node.left);
      this.#recurpostorderTraverse(node.right);
      console.log(node.data);
    }
  }
  treeHeight() {
    // returns the height of the BST.
    if (this.root) {
      let node = this.root;
      let height = this.#findheight(node);
      return height;
    }
  }
  #findheight(node) {
    // private function to find the height of the tree.
    if (node == null) {
      return -1;
    }
    let leftheight = this.#findheight(node.left);
    let rightheight = this.#findheight(node.right);
    return Math.max(leftheight, rightheight) + 1;
  }
  find(data) {
    // returns true if the data is found in the tree,else false.
    let result;
    if (this.root) {
      result = this.#findData(data, this.root);
      return result;
    } else {
      console.log("Tree empty... (from find(data))");
    }
  }
  #findData(data, node) {
    // helper function to find the data for find function.
    if (data == node.data) {
      // console.log("data found", node.data);
      return node;
    }
    if (data < node.data && node.left != null) {
      // console.log("searching node L", node.data);
      return this.#findData(data, node.left);
    } else {
      if (data > node.data && node.right != null) {
        // console.log("searching node R", node.data);

        return this.#findData(data, node.right);
      }
      return false;
    }
  }
  levelOrderTraversal() {
    // print the level order traversal of the binary tree.
    // -At each level store the node in the tempq.
    // for each item in tempq- first shift out the item and then if left or right child exists, push them into tempq.
    // - repeat the above until tempq goes blank.
    let currnode = this.root;
    let levelarray = [];
    let tempq = [];

    if (!currnode) {
      console.log("Tree empty");
      return;
    } else {
      tempq.push(currnode);
      levelarray.push(currnode.data);
    }
    while (tempq.length != 0) {
      let temp = tempq.shift();
      if (temp.left != null) {
        tempq.push(temp.left);
        levelarray.push(temp.left.data);
      }
      if (temp.right != null) {
        tempq.push(temp.right);
        levelarray.push(temp.right.data);
      }
    }
    console.log(levelarray);
  }
  findMinLeftinRightTree(currnode) {
    // returns the lowest value in the left tree of the given node which is the last node.
    // this result is used to replace the deleted node who has both left & right child.

    while (currnode.left) {
      currnode = currnode.left;
    }
    // let lastnode = currnode;
    return currnode.data;
  }

  delete(data) {
    /*
      this function deletes the given node.
      Case 1: node does not have any children - just delete by removing its parent's link to it.
      Case 2: node with only 1 child. deleted by removing its parent link to it.
      Case 3: node with both Left & Right child.
              - deleted node can be replaced either
                     by highest node of its left tree (which is found in the RIGHT most side)
                      (or)
                    by lowest node of its right tree (which is found in the LEFT most side).
      */
    let currnode = this.root;
    let result = this.#deletenode(currnode, data);
  }

  #deletenode(node, data) {
    // console.log("entering #delete node", node.data, data);
    if (data < node.data && node.left) {
      // search in left tree.
      node.left = this.#deletenode(node.left, data);
    } else if (data > node.data && node.right) {
      // search in right tree.
      node.right = this.#deletenode(node.right, data);
    } else if (data == node.data) {
      // check if 2 child is present.
      if (node.left && node.right) {
        // this is node with 2 children.so find the minimum in the right tree.
        let minvalue = this.findMinLeftinRightTree(node.right);
        node.data = minvalue;
        node.right = this.#deletenode(node.right, minvalue);
      } else if (node.left) {
        // only left child is present.
        return node.left;
      } else if (node.right) {
        // only right child is present.
        return node.right;
      } else {
        // no child is present.
        return null;
      }
    }
    // console.log("returning back", node);
    return node;
  }
}
// -------------------------BST Class ends....

let bst = new BST();
/*
  bst.insert(4);
  bst.insert(10);
  bst.insert(3);
  bst.insert(2);
  bst.insert(6);
  bst.insert(7);
  bst.insert(8);
  bst.insert(9);
  */

/*
      (4)
  (3)   -    (10)
  (2)   -  (6)
              (7)
               (8) 
                (9)
  */

bst.insert(50);
bst.insert(25);
bst.insert(75);
bst.insert(15);
bst.insert(35);
bst.insert(65);
bst.insert(85);
bst.insert(10);
bst.insert(18);
bst.insert(27);
bst.insert(40);
bst.insert(60);
bst.insert(70);
bst.insert(83);
bst.insert(98);

bst.inOrderTraversal();
// bst.postOrderTraversal();
let r = bst.treeHeight();
console.log("Height of the tree is", r);
console.log("--------------");

let n = 65;
let s = bst.find(n);
if (s != false) {
  console.log(`node ${n} is found in the tree`);
  console.log(s);
} else {
  console.log(`node ${n} is not found in the tree`);
}
console.log("--------------");
console.log("Level order traversal");
bst.levelOrderTraversal();
console.log("--------------");
let del = 50;
bst.delete(del);
console.log(`node(${del}) is deleted`);

bst.levelOrderTraversal();
