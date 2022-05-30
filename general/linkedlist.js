// Linked list implementation in javascript.
//  s3sivaram@gmail.com : 30May22.

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Linkedlist {
  constructor(node) {
    if (node) {
      this.head = node;
      this.length = 1;
    } else {
      this.head = null;
      this.length = 0;
    }
  }
  addasFirstNode(node) {
    // adds the given node as the first node.
    let currhead = this.head;
    this.head = node;
    node.next = currhead;
    this.length = this.length + 1;
  }
  add(node) {
    // add a node to the linked list
    let currnode = this.head;
    this.length = this.length + 1;

    if (currnode) {
      while (currnode.next) {
        currnode = currnode.next;
      }
      currnode.next = node;
    }
  }

  getFirst() {
    // returns the first node in the linked list.
    return this.head;
  }
  getLast() {
    // get the last node in the linked list.
    let currnode = this.head;
    if (currnode) {
      while (currnode.next) {
        currnode = currnode.next;
      }
      console.log("last node is", currnode);
    }
  }
  printNodes() {
    let currnode = this.head;
    let c = 1;
    if (this.head) {
      while (currnode.next) {
        console.log(
          `node-${c} is ${currnode.data} => to ${currnode.next.data}`
        );
        c++;
        currnode = currnode.next;
      }
      console.log(`node-${c} is ${currnode.data} => to ${currnode.next}`);
    }
  }
  printNodesReverse() {
    let currnode = this.head;
    recurnode(currnode);
    function recurnode(currnode) {
      if (!currnode.next) {
        // console.log(currnode.data);
        process.stdout.write(`${currnode.data}`);
        return;
      }
      recurnode(currnode.next);
      // console.log(currnode.data);
      process.stdout.write(`${currnode.data}`);
    }
    console.log("");
  }
  clear() {
    // clears the linked list and set the length to 0.
    this.length = 0;
    this.head = null;
  }
  shift() {
    // removes the first element in the linkedlist and returns it.
    if (!this.head) {
      return;
    }
    let currnode = this.head;
    this.head = this.head.next;
    this.length = this.length - 1;
    return currnode;
  }
  pop() {
    // removes the last node in the linked list.
    let prevnode;
    let currnode = this.head;
    if (this.head) {
      while (currnode.next) {
        prevnode = currnode;
        currnode = currnode.next;
      }
      prevnode.next = null;
      this.length--;
      return this.head;
    }
  }

  getIndex(num) {
    // returns the data at the index number of the linked list.
    if (num > this.length || num < 0) {
      console.log(`Index no ${num} is out of bounds (getIndex method)`);
      return null;
    }
    let currnode = this.head;
    let count = 1;
    if (this.head) {
      while (count < num && count < this.length) {
        currnode = currnode.next;
        count = count + 1;
      }
      console.log(`Data at node ${num} is ${currnode.data}`);
      return currnode;
    }
  }
  set(index, data) {
    // sets the data at the index of the linked list.
    if (index > this.length || index < 0) {
      console.log(`Index no ${num} is out of bounds (set method)`);
      return null;
    }
    let currnode = this.getIndex(index);
    if (currnode) {
      currnode.data = data;
    } else {
      console.log(`Index${index} not found in the linked list`);
      return;
    }
  }

  remove(index) {
    // removes the index node from the linked list.
    if (index > this.length || index < 0) {
      console.log(`Index no ${num} is out of bounds (remove method)`);
      return null;
    }
    let currnode = this.getIndex(index);
    let prevnode = this.getIndex(index - 1);
    prevnode.next = currnode.next;
    console.log(`removed node${index} from the linked list`);
    this.length--;
    return currnode;
  }
  insert(index, data) {
    // inserts the data at the index of the linked list.
    if (index > this.length || index < 0) {
      console.log(`Index no ${index} is out of bounds (insert method)`);
      return null;
    }
    let node1 = this.getIndex(index - 1); // one node before to be inserted
    let node2 = this.getIndex(index); // one node after to be inserted
    let newnode = new Node(data);
    node1.next = newnode;
    newnode.next = node2;
    this.length++;
    console.log(`new data${data} inserted at node ${index} of the linked list`);
    return;
  }
}
let node = new Node(1);
let n2 = new Node(2);
let n3 = new Node(3);
let n4 = new Node(4);
let l1 = new Linkedlist(node);
console.log("addind nodes n2,n3,n4");
l1.add(n2);
l1.add(n3);
l1.add(n4);
console.log(l1);
console.log("------------------");
console.log("All nodes present in the linked list");
// l1.printNodes();
console.log("------------------");
// console.log("All nodes present in the linked list displayed in reverse order.");
// l1.printNodesReverse();
// console.log("------------------");

// console.log("\n l1 first node is", l1.getFirst());
let n0 = new Node(0);
// console.log("------------------");
// console.log("Added node n0 at the first place in the linked list");
l1.addasFirstNode(n0);
l1.printNodes();
console.log("------------------");
console.log(l1);
console.log("shifting the linked list", l1.shift());
console.log("------------------");

l1.printNodes();
/*
  console.log("------------------");
  console.log("shifting the linked list", l1.shift());
  console.log("shifting the linked list", l1.shift());
  console.log("shifting the linked list", l1.shift());
  console.log("shifting the linked list", l1.shift());
  console.log("------------------");
  */
console.log("------------------");
console.log("popping out ...");
l1.pop();
l1.printNodes();
console.log("------------------");
console.log(l1);
l1.getIndex(2);
console.log("------------------");
l1.set(2, 22);
l1.printNodes();
l1.remove(2);
console.log("------------------");
l1.insert(2, 33);
l1.printNodes();
