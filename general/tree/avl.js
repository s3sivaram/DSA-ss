// BST Tree - All kinds of Traversals......

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.height = null;
  }
}
class AVL {
  constructor() {
    this.root = null;
  }
  insert(data) {
    let nodeheight = 0;
    if (this.root == null) {
      this.root = new Node(data);
      this.root.height = 0;
    } else {
      avlInsert(data, this.root);
    }
    function avlInsert(data, currnode) {
      if (data == currnode.data) {
        console.log("duplicate data");
        return;
      } else if (data < currnode.data) {
        nodeheight = nodeheight + 1;
        if (currnode.left) {
          avlInsert(data, currnode.left);
        } else {
          let newnode = new Node(data);
          newnode.height = nodeheight;
          currnode.left = newnode;
        }
      } else if (data > currnode.data) {
        nodeheight = nodeheight + 1;
        if (currnode.right) {
          avlInsert(data, currnode.right);
        } else {
          let newnode = new Node(data);
          newnode.height = nodeheight;
          currnode.right = newnode;
        }
      }
    }
  }

  Traverse(order) {
    let currnode = this.root;
    if (!currnode) {
      console.log("Empty tree - nil inorder traversal ");
      return;
    } else {
      if (order == "inorder") {
        console.log("In Order");

        traverseInorder(currnode);
        return;
      } else if (order == "postorder") {
        console.log("Post Order");
        traversePostorder(currnode);
        return;
      } else if (order == "preorder") {
        console.log("Pre Order");
        traversePreorder(currnode);
        return;
      }
    }

    function traverseInorder(currnode) {
      if (!currnode) {
        return;
      }
      traverseInorder(currnode.left);
      console.log(currnode.data);
      traverseInorder(currnode.right);
    }
    function traversePostorder(currnode) {
      if (!currnode) {
        return;
      }
      traversePostorder(currnode.left);
      traversePostorder(currnode.right);
      console.log(currnode.data);
    }
    function traversePreorder(currnode) {
      if (!currnode) {
        return;
      }
      console.log(currnode.data);
      traversePreorder(currnode.left);
      traversePreorder(currnode.right);
    }
  }

  iterativePreTraversal() {
    let currnode = this.root;
    let stack = [];
    let traverseResult = [];
    if (!currnode) {
      console.log("Tree empty - No traversal");
      return;
    }
    stack.push(currnode);
    while (stack.length) {
      let root = stack.pop();
      traverseResult.push(root.data);
      if (root.right) {
        stack.push(root.right);
      }
      if (root.left) {
        stack.push(root.left);
      }
    }
    console.log("Iterative Pre order traversal");
    console.log(traverseResult);
  }

  iterativeInorderTraversal() {
    let currnode = this.root;
    let traverseResult = [];
    let stack = [];
    console.log("in Order - Iterative");
    while (true) {
      if (currnode != null) {
        stack.push(currnode);
        currnode = currnode.left;
      } else {
        if (stack.length == 0) {
          break;
        }
        currnode = stack.pop();
        traverseResult.push(currnode.data);
        currnode = currnode.right;
      }
    }
  }

  maxHeight() {
    // returns the maximum height of the tree.
    let currnode = this.root;
    let height = this.treeheight(currnode);
    console.log("maximum height of the tree is ", height);
  }

  treeheight(currnode) {
    // helper function to calculate the max height.
    // at each node  height =1 + max(left height, right height).

    if (currnode == null) {
      return 0;
    }
    let left = this.treeheight(currnode.left);
    let right = this.treeheight(currnode.right);
    let t = Math.max(left, right);
    return 1 + Math.max(left, right);
  }

  balancedTree() {
    // returns true if the tree is balanced else false.
    let currnode = this.root;
    // console.log(`node(${currnode.data}) height is ${currnode.height}`);

    let l = this.checkbalance(currnode.left);
    let r = this.checkbalance(currnode.right);

    if (l == true && r == true) {
      console.log("Balanced tree");
    } else {
      console.log("Not balanced tree");
    }
  }

  checkbalance(currnode) {
    // helper function to check if the tree is balanced or not.

    if (currnode == null) {
      return true;
    }

    let lheight = this.treeheight(currnode.left);
    let rheight = this.treeheight(currnode.right);

    if (Math.abs(lheight - rheight) > 1) {
      return false;
    }

    return true;
  }

  levelTraversal() {
    let currnode = this.root;
    let tempq = [];
    let leveltree = [];
    let levelheight = [];
    let row = [];
    let children = [];
    let h = 0;
    if (!currnode) {
      //  tree is empty.
      console.log("Tree is empty...");
      return null;
    } else if (currnode) {
      tempq.push(currnode);
    }

    while (tempq.length) {
      /*
          - pre-while step:push the currnode to tempq.
          for each item in tempq{
            - copy the item's data in row (to segregate row wise nodes).
            - find the left & right children if available and place them in children.
          }
          empty the row and copy the children into tempq.
          repeat the process until tempq is empty(i.e. there are no more levels with children).
          
        */
      for (let i = 0; i < tempq.length; i++) {
        row.push(tempq[i].data);

        if (tempq[i].left) {
          children.push(tempq[i].left);
        }
        if (tempq[i].right) {
          children.push(tempq[i].right);
        }
      }
      leveltree.push(row);
      levelheight.push(h);
      h++;
      row = [];
      tempq = [...children];
      children = [];
    }
    console.log("level traversal:", leveltree);
    console.log("----------------");
    console.log("Tree levels:", levelheight);
  }

  zigzagTree() {
    // prints the tree in a zig zag order.
    // do a level traversal , flip the order of pushing into answer array each time.

    let currnode = this.root;
    printzigzag(currnode);

    function printzigzag(currnode) {
      // helper function to print the tree in zigzag fashion.

      let tempq = [];
      let lefttoright = true;
      let zigzag = [];
      let row = [];
      tempq.push(currnode);
      let children = [];

      while (tempq.length) {
        for (let i = 0; i < tempq.length; i++) {
          if (lefttoright) {
            row.push(tempq[i].data);
          } else {
            // push in reverse order.
            row.unshift(tempq[i].data);
          }
          if (tempq[i].left) {
            children.push(tempq[i].left);
          }
          if (tempq[i].right) {
            children.push(tempq[i].right);
          }
        }
        zigzag.push(row);
        row = [];
        tempq = [...children];
        children = [];
        lefttoright = !lefttoright;
      }
      console.log("zigzag--------");
      console.log(zigzag);
    }
  }

  boundaryTravesal() {
    // returns the anticlock wise boundary nodes of the tree.

    let currnode = this.root;
    let leaftree = [];
    let lefttree = [];
    let righttree = [];

    if (!currnode) {
      console.log("Tree empty - nil boundary traversal");
      return;
    } else {
      lefttraverse(currnode.left);
      righttraverse(currnode.right);
      leafnodes(currnode);
    }
    // root node+left traversal+right traversal + leaf nodes = boundary traversal.
    let res = [[this.root.data], lefttree, leaftree, righttree];
    console.log("Boundary traversal (Anti clock wise:", res);

    function lefttraverse(node) {
      // helper function to traverse through left tree but not the leaf node and store the results in lefttree array.
      while (node) {
        if (!isLeaf(node)) {
          lefttree.push(node.data);
        }
        if (!node.left) {
          node = node.right;
        } else {
          node = node.left;
        }
      }
      console.log("left tree=", lefttree);
    }
    function righttraverse(node) {
      // helper function to traverse through right tree but not the leaf node and store the results in lefttree array.
      while (node) {
        if (!isLeaf(node)) {
          righttree.unshift(node.data);
        }
        if (!node.right) {
          node = node.left;
        } else {
          node = node.right;
        }
      }
      console.log("Right tree=", righttree);
    }

    function leafnodes(node) {
      // does an inorder traversal and stores the leaf nodes of the tree.
      if (isLeaf(node)) {
        leaftree.push(node.data);
        return;
      }

      if (node.left) {
        leafnodes(node.left);
      }
      if (node.right) {
        leafnodes(node.right);
      }
    }

    function isLeaf(currnode) {
      // returns true if the node does not have any child at all.
      return !currnode.left && !currnode.right;
    }
  }

  // ----- End of class AVL
}

function traverseTwotree(tree1, tree2) {
  // traverses 2 trees at the same time and return true if they are identical.

  if (tree1 == null || tree2 == null) {
    return tree1 == tree2;
  }
  return (
    tree1.data == tree2.data &&
    traverseTwotree(tree1.left, tree2.left) &&
    traverseTwotree(tree1.right, tree2.right)
  );
}

let avl = new AVL();
/*
  avl.insert(6);
  avl.insert(7);
  avl.insert(5);
  avl.insert(4);
  avl.insert(8);
  avl.insert(9);
  avl.insert(3);
  avl.insert(1);
  */
/*
  avl.insert(10);
  avl.insert(9);
  avl.insert(11);
  avl.insert(8);
  avl.insert(12);
  avl.insert(13);
  avl.insert(7);
  avl.insert(6);
  */
avl.insert(41);
avl.insert(20);
avl.insert(65);
avl.insert(11);
avl.insert(29);
avl.insert(50);
avl.insert(91);
avl.insert(32);
avl.insert(72);
avl.insert(99);
// avl.insert(35);
avl.levelTraversal();
// avl.Traverse("inorder");
// avl.Traverse("preorder");
// avl.Traverse("postorder");
// avl.iterativePreTraversal();
// avl.iterativeInorderTraversal();
// avl.maxHeight();
// avl.balancedTree();

let tree1 = new AVL();
let tree2 = new AVL();

tree1.insert(41);
tree1.insert(20);
tree1.insert(65);

tree2.insert(41);
tree2.insert(20);
// tree2.insert(65);

// let result = traverseTwotree(tree1.root, tree2.root);
// console.log("Traversed 2 tree", result);

// console.log(tree1);
// console.log(tree2);

// avl.zigzagTree();
avl.boundaryTravesal();
