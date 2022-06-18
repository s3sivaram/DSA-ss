//  Graph implementation in javascript using Adjacency matrix.
// s3sivaram@gmail.com - 18Jun2022.

class Graph {
  #nodes;

  constructor() {
    this.#nodes = {};
    this.distancebetweenNodes = {};
  }
  addNode(node) {
    // adds the node to the graph.
    this.#nodes[node] = [];
  }
  addEdge(node1, node2) {
    // adds an edge between the 2 nodes.

    if (!this.#nodes[node1]) {
      console.log("------result of addEdge-------");
      console.log(`Node-${node1} not found in the graph.`);
      return false;
    }
    if (!this.#nodes[node2]) {
      console.log("------result of addEdge-------");
      console.log(`Node-${node2} not found in the graph.`);
      return false;
    }

    if (!this.#nodes[node1].includes(node2)) {
      this.#nodes[node1].push(node2);
    } else {
      console.log(`Path from node(${node1}) to node(${node2} already exists.`);
    }
    if (!this.#nodes[node2].includes(node1)) {
      this.#nodes[node2].push(node1);
    }
  }

  showallnodes() {
    // shows all the nodes in the graph.
    console.log(`Nodes in the graph are `);
    console.log(`------------------------`);
    console.log(this.#nodes);
    return;
  }
  showPathsexistingfrom(node) {
    // displays the all the path available from the given node.
    // console.log();
    // console.log(`-----------------Paths in the graph -----------`);
    // console.log();

    if (this.#nodes[node] == undefined) {
      console.log(`No paths available from node(${node})`);
      return;
    }
    // console.log(`Path available from the node(${node})`);
    // console.log(`node(${node})=>node(${this.#nodes[node]})`);
    // console.log();
    let res = this.#nodes[node];
    return res;
  }

  pathBetween(source, destination) {
    // returns true if the node is present in the graph - BFS.
    console.log();
    console.log(`-----------------Path between -----------`);
    console.log();

    let tracepath = "";
    let tempq = [];
    let visitednodes = {};
    tempq.push(source);

    while (tempq.length) {
      let length = tempq.length;
      for (let i = 0; i < length; i++) {
        let pop = tempq.shift();
        if (!visitednodes[pop]) {
          visitednodes[pop] = true;

          if (pop == destination) {
            console.log(`Path between "${source}" and "${destination}" exist.`);
            tracepath = tracepath + destination;
            console.log(
              `Tracepath: ${tracepath} (not the shortest path though...)`
            );
            return true;
          }
          tracepath = tracepath + pop + " -> ";
          tempq.push(...this.#nodes[pop]);
        }
      }
    }
    console.log(`Path between (${source}) and (${destination}) dose not exist`);
    return false;
  }
  BFStraversal(node) {
    /* --------
       prints the BFS travel path of the graph.
       Traversal starts from the given node.
        ----------*/
    console.log();
    console.log("----BFS traversal of the graph-----");

    if (!this.#nodes[node]) {
      console.log(`Node: ${node} does not exist in the graph`);
      return false;
    }
    let tempq = [];
    let visitednodes = {};
    let tracepath = "";
    tempq.push(node);
    while (tempq.length) {
      let length = tempq.length;
      let pop = tempq.shift();
      if (!visitednodes[pop]) {
        visitednodes[pop] = true;
        tracepath = tracepath + pop + " -> ";
        tempq.push(...this.#nodes[pop]);
      }
    }
    console.log("START -> " + tracepath + "END");
  }

  DFStravesal(node) {
    /* --------
       prints the DFS travel path of the graph.
       Traversal starts from the given node.
        ----------*/
    console.log();
    console.log("----DFS traversal of the graph-----");
    console.log();
    if (!this.#nodes[node]) {
      console.log(`Node: ${node} does not exist in the graph`);
      return false;
    }
    let stack = [];
    let visitednodes = {};
    let tracepath = "";

    stack.push(node);
    while (stack.length) {
      let pop = stack.pop();
      if (!visitednodes[pop]) {
        visitednodes[pop] = true;
        tracepath = tracepath + pop + " -> ";
        stack.push(...this.#nodes[pop]);
      }
    }
    console.log("START -> " + tracepath + "END");
  }
  // ---------
  setdistance(distance) {
    /* updates the distance between two nodes.
         format : [[node1,node2,distance],[node1,node3,distance],...]
     
         */
    console.log();
    console.log("----Distance Map of the graph-----");
    console.log();
    // let distancebetweenNodes = {};

    distance.forEach((node) => {
      let [source, destination, distance] = [node[0], node[1], node[2]];

      let sourceobj = { [destination]: distance };
      this.distancebetweenNodes[source] = {
        ...this.distancebetweenNodes[source],
        ...sourceobj,
      };
      let destinationobj = { [source]: distance };
      this.distancebetweenNodes[destination] = {
        ...this.distancebetweenNodes[destination],
        ...destinationobj,
      };
    });

    console.log(this.distancebetweenNodes);
    // console.log("Trichy-Chennai", this.distancebetweenNodes["Trichy"]["Chennai"]);
    // console.log("Bodi-Theni", this.distancebetweenNodes["Bodi"]["Theni"]);
    // console.log("--------");
    // let distancemapkeys = Object.keys(this.distancebetweenNodes);
    // console.log(distancemapkeys);
    // distancemapkeys.forEach((n) => console.log(this.distancebetweenNodes[n]));
    // ----function ends-----------
  }
  findNearestdistanceofNode(node) {
    // finds the nearest distant node from the given node.
    let connectednodes = this.distancebetweenNodes[node];

    let connectednodesarray = Object.entries(connectednodes);
    let mindistance = Number.MAX_VALUE;
    let mindestination;
    connectednodesarray.forEach((node) => {
      let [source, distance] = [node[0], node[1]];
      if (distance < mindistance) {
        mindistance = distance;
        mindestination = source;
      }
    });
    // console.log(
    //   `minimum distance node from ${node} is ${mindestination} at ${mindistance} km.`
    // );
    // return [mindestination, mindistance];
    return mindestination;
  }
  // ----function ends-----------.

  shortestPathfrom(node) {
    //  USING DIJKSTRA Algorithm.
    // finds the shortest path from the given node to all other nodes in the graph.

    console.log();
    console.log(`----Shortest path in the graph from ${node} to `);
    console.log();
    if (!this.#nodes[node]) {
      console.log(`Invalid node - ${node}`);
      return;
    }

    let visitednodes = [];
    let costing = [];
    let totalnodes = Object.keys(this.#nodes).length;
    let tempq = [];
    // set the cost of all nodes in the graph to MAX number/infinity.
    for (let i = 0; i < totalnodes; i++) {
      costing[Object.keys(this.#nodes)[i]] = Number.MAX_SAFE_INTEGER;
    }
    costing[node] = 0;
    tempq.push(node);
    dijsktracosting.call(this, node);
    console.log(costing);

    function dijsktracosting(currnode) {
      while (tempq.length) {
        let pop = tempq.pop();
        if (!visitednodes[pop]) {
          let connectednodes = this.showPathsexistingfrom(pop);
          setCostingtoConnectnodes.call(this, connectednodes, pop);
          visitednodes[pop] = true;
          let nearestdistancenode = this.findNearestdistanceofNode(pop);
          // console.log("nearest node=", nearestdistancenode);
          currnode = nearestdistancenode;
          // dijsktracosting.call(this, currnode);
        }
      }
    }
    function setCostingtoConnectnodes(connectednodes, currnode) {
      // sets the cost to the connected nodes of the given node.
      connectednodes.forEach((connectednode) => {
        // console.log("con node", connectednode);
        // console.log("currnode", currnode);
        // console.log(`costing(${connectednode}) is ${costing[connectednode]}`);
        tempq.push(connectednode);
        let distance = this.distancebetweenNodes[currnode][connectednode];
        if (costing[connectednode] > costing[currnode] + distance) {
          costing[connectednode] = costing[currnode] + distance;
          // console.log(
          // `costing(${connectednode})=${costing[currnode] + distance}`
          // );
        }
      });
    }
  }
  // ----function ends-----------.
}
// ------------End of class Graph-----------------

// ********************* MAIN Starts *********************//

console.log();
console.log("------------------Graph--------------------");
console.log();
testssgraph();
// testsamplegraph();

console.log();
console.log("------------------Graph--------------------");
console.log();
// ********************* MAIN Ends *********************//
function testssgraph() {
  // ss testing data for the graph.
  g = new Graph();

  let distance = [
    ["Bodi", "Theni", 15],
    ["Theni", "Madurai", 75],
    ["Bodi", "Kerala", 75],
    ["Theni", "Trichy", 250],
    ["Trichy", "Chennai", 250],
    ["Madurai", "Chennai", 250],
    ["Salem", "Trichy", 100],
    ["Salem", "Bangalore", 150],
    ["Chennai", "Bangalore", 100],
  ];

  // g.addNode("newtown");
  // g.addNode("oldtown");
  g.addNode("Bodi");
  g.addNode("Theni");
  g.addNode("Madurai");
  g.addNode("Trichy");
  g.addNode("Kerala");
  g.addNode("Chennai");
  g.addNode("Salem");
  g.addNode("Bangalore");

  // g.addEdge("newtown", "oldtown");
  g.addEdge("Theni", "Bodi");
  g.addEdge("Theni", "Madurai");
  g.addEdge("Bodi", "Kerala");
  g.addEdge("Theni", "Trichy");
  g.addEdge("Trichy", "Chennai");
  g.addEdge("Trichy", "Salem");
  g.addEdge("Chennai", "Bangalore");
  // g.showallnodes();
  // g.showPathsexistingfrom("X");
  // g.showPathsexistingfrom("Madurai");

  // g.pathBetween("Kerala", "Chennai");
  // g.pathBetween("Trichy", "Chennai");
  // g.BFStraversal("newtown");
  // g.BFStraversal("Bodi");
  // g.DFStravesal("Bodi");
  g.setdistance(distance);
  // let [mindestination, mindistance] = g.findNearestdistanceofNode("Madurai");
  // console.log(mindestination, mindistance);
  // g.showPathsexistingfrom("Bodi");
  g.shortestPathfrom("Bodi");
  g.shortestPathfrom("Chennai");
}
// ------------------------------------------
function testsamplegraph() {
  // sample data for testing the graph.
  g = new Graph();

  g.addNode("1");
  g.addNode("2");
  g.addNode("3");
  g.addNode("4");
  g.addNode("5");
  g.addNode("6");
  g.addNode("7");

  g.addEdge("1", "5");
  g.addEdge("1", "4");
  g.addEdge("1", "2");
  g.addEdge("2", "7");
  g.addEdge("2", "6");
  g.addEdge("2", "3");

  g.showallnodes();
  g.BFStraversal("3");
  g.DFStravesal("3");
}
// ------------------------------------------
