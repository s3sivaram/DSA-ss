class Node {
  constructor(data) {
    this.data = data;
    this.pointer = null;
  }
}

class Linkedlist {
  constructor() {
    this.head = null;
    this.length = 0;
  }
  add(data) {
    let currnode = this.head;
    if (!this.head) {
      this.head = new Node(data);
      this.length = 1;
    } else {
      while (currnode.pointer) {
        currnode = currnode.pointer;
      }
      currnode.pointer = new Node(data);
      this.length = this.length + 1;
    }
  }

  printNodes() {
    let node = this.head;
    while (node.pointer != null) {
      process.stdout.write(`node(${node.data})->`);
      node = node.pointer;
    }
    process.stdout.write(`node(${node.data})`);

    console.log(" ");
  }

  reverseNodes() {
    let node = this.head;
    let headnode;
    printreverse(node);
    function printreverse(node) {
      /* 
        keep passing the node to the recur function which will store the node detail as prevnode before it calls recursively.
        when recur reaches null pointer return that node which will be updated as Head node in the linkedlist class.
        while returning back from each recur call set the node's pointer to prev node.
        After the end of all the recur calls, set the last node pointer to null.
        */
      if (node.pointer == null) {
        return node;
      }
      let prevnode = node;
      node = node.pointer;
      headnode = printreverse(node);
      node.pointer = prevnode;
      return headnode;
    }
    this.head = headnode;
    node.pointer = null;
  }
}
let node = new Node(1);
let ll = new Linkedlist();
ll.add(1);
ll.add(2);
ll.add(3);
ll.add(4);
ll.add(4.5);
ll.add(5);
ll.printNodes();
ll.reverseNodes();
ll.printNodes();

// console.log(ll);
