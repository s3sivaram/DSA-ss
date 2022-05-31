class Pqueue {
  //  class to hold priority queue.
  constructor() {
    this.datastore = [];
    this.length = this.datastore.length;
  }

  addToQueue(element) {
    // add the element to the queue, element no is the priority.
    if (this.datastore.length == 0) {
      this.datastore.push(element);
      return;
    } else {
      for (let i = 0; i < this.datastore.length; i++) {
        if (element > this.datastore[i]) {
          this.datastore.splice(i, 0, element);
          return;
        }
      }
      this.datastore.push(element);
      return;
    }
  }
}

let q = new Pqueue();
console.log(q);
q.addToQueue(1);
q.addToQueue(2);
q.addToQueue(1);
q.addToQueue(3);

console.log(q.datastore);
