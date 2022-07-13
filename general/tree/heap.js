// Javascript implementation of Heap - s3sivaram@gmail.com / 10Jun2022.
/*
    Array implementation of Heap.

    Parent=(index-1)/2.
    Left child=2*index +1.
    Right child=2*index +2.

    Insert   :  Add the element to the end of the data array.
                Heapify up.
    HeapifyUp:  if there exist a parent to the element added &
                if the added element is smaller than its parent, then swap it.
                Move on to the parent node of the element.
                Repeat the above process untill there exists a parent or if the parent is greater than its cild.

    removeMin:  pop the first element in the data array.
                move the last element in the data array to the first position.
                Heapify down.
    HeapifyDown: set the index to this.data[0].
                 find the smallest child of this.data[0].
                 if the smallest child is greater than its parent, swap it.
                 move to the left child of the index.
                 repeat the process until the left child has no children.


  reference:NoobCoder.


*/

class MinHeap {
  constructor() {
    this.data = [];
    this.size = 0;
  }

  insert(data) {
    // will insert the data into the heap.
    this.data.push(data);
    this.size = this.size + 1;
    this.heapifyUp(this.size - 1);
  }

  heapifyUp(index) {
    // heapify up.
    if (this.hasParent(index)) {
      if (this.hasParent(index) && this.parent(index) > this.data[index]) {
        this.swap(this.getParentIndex(index), index);
      }
      index = this.getParentIndex(index);
      this.heapifyUp(index);
    }
  }
  removeMin() {
    //  removes the minimum data available in the heap.
    let data = this.data[0];
    this.data[0] = this.data[this.size - 1];
    this.size = this.size - 1;
    this.data.length--;

    this.heapifyDown(0);
    return data;
  }

  heapifyDown(index) {
    //  heapify down.
    let smallest = index;
    if (
      this.hasLeftChild(index) &&
      this.leftChild(index) < this.data[smallest]
    ) {
      smallest = this.getLeftChildIndex(index);
    }
    if (
      this.hasRightChild(index) &&
      this.rightChild(index) < this.data[smallest]
    ) {
      smallest = this.getRightChildIndex(index);
    }

    if (this.data[index] > this.data[smallest]) {
      //   console.log(
      //     `data(index)=${this.data[index]} , data(smallest)=${this.data[smallest]}`
      //   );

      this.swap(index, smallest);
      this.heapifyDown(smallest);
    }
  }

  swap(index1, index2) {
    // swaps index1 & index2 in this.data.
    [this.data[index1], this.data[index2]] = [
      this.data[index2],
      this.data[index1],
    ];
  }
  getParentIndex(index) {
    // returns the parent index of the index.
    return Math.floor((index - 1) / 2);
  }

  getLeftChildIndex(index) {
    // returns the leftchild index of the index.
    return 2 * index + 1;
  }

  getRightChildIndex(index) {
    // returns the leftchild index of the index.
    return 2 * index + 2;
  }

  hasParent(index) {
    // returns true if the parent index >=0.
    return this.getParentIndex(index) >= 0;
  }
  hasLeftChild(index) {
    // returns true if the index has a leftchild.
    return this.getLeftChildIndex(index) < this.size;
  }
  hasRightChild(index) {
    // returns true if the index has a Rightchild.
    return this.getRightChildIndex(index) < this.size;
  }

  parent(index) {
    // returns the parent of the index.
    return this.data[this.getParentIndex(index)];
  }
  leftChild(index) {
    // returns the leftchild of the index.
    return this.data[this.getLeftChildIndex(index)];
  }

  rightChild(index) {
    // returns the rightchild of the index.
    return this.data[this.getRightChildIndex(index)];
  }

  // ------------End of Heap class----------------
}

let heap1 = new MinHeap();

heap1.insert(5);
heap1.insert(20);
heap1.insert(11);
heap1.insert(5);
heap1.insert(10);
console.log("Initial heap = ", heap1.data);
console.log("--------------------------------");
console.log("removed = ", heap1.removeMin());
console.log("Heap remaining... ", heap1.data);
console.log("removed = ", heap1.removeMin());
console.log("removed = ", heap1.removeMin());
console.log("Heap remaining... ", heap1.data);
console.log("--------------------------------");
