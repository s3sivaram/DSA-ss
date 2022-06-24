//  Graph implementation in Javascript - s3sivaram@gmail.com - 23JUn22.

class Graph {
  constructor() {
    this.nodes = {};
  }

  addNode(node) {
    // adds node to the graph.
    if (!this.nodes[node]) {
      this.nodes[node] = {};
    } else {
      console.log(`Node:${node} already exist, so Not added into the graph.`);
      return;
    }
  }
  // ----End of function-------.

  addNodesthruarray(nodesarray) {
    /* add the nodes supplied thru an array - Batch type.
            nodesarray format:[node1,node2,node3]
        
                          */
    nodesarray.forEach((node) => {
      if (!this.nodes[node]) {
        this.nodes[node] = {};
      } else {
        console.log(`Node:${node} already exist, so Not added into the graph.`);
      }
    });
  }
  // ----End of function-------.

  addEdgeandWeightthruarray(edgeweightarray) {
    /* ---
             adds the edges and the corresponding weights into the graph.
             array format :["node1","node2","weight"]
              
              ---------*/
    // console.log("---------------Adds Edge and weight in the graph-----------");
    edgeweightarray.forEach((edgeweight) => {
      // creates a undirected edge & weights based on the edgeweight data.

      let [node1, node2, weight] = [
        edgeweight[0],
        edgeweight[1],
        edgeweight[2],
      ];
      if (!this.nodes[node1]) {
        console.log(
          `Node(${node1}) not present in the graph.so edge & weight Not added`
        );
      } else if (!this.nodes[node2]) {
        console.log(
          `Node(${node2}) not present in the graph.so edge & weight Not added`
        );
      } else {
        this.nodes[node1] = { ...this.nodes[node1], [node2]: weight };
        this.nodes[node2] = { ...this.nodes[node2], [node1]: weight };
      }
    });
    // console.log("------------------------------------------------------");
  }
  // ----End of function-------.

  showallNodes() {
    // shows all the nodes in the graph.
    console.log("------------All nodes in the graph----------");
    console.log(this.nodes);
    console.log("--------------------------------------------");

    return;
  }
  // ----End of function-------.
  detectCycleinGraph() {
    // detects if the graph has a cyclic component - uses BFS.

    let visitednodes = [];
    let totalnodeslist = Object.keys(this.nodes);
    let totalnodeslength = totalnodeslist.length;
    for (let i = 0; i < totalnodeslength; i++) {
      let node = totalnodeslist[i];
      if (!visitednodes[node]) {
        console.log("visited node =", node);
        let [result, cyclicnode] = BFSdetectcycle.call(this, node);
        if (result) {
          console.log("Graph has a cyclic component ");
          console.log(`Cyclic node is ${cyclicnode}`);
          return true;
        }
      }
    }

    console.log("Graph does not have  a cyclic component ");

    function BFSdetectcycle(node) {
      /*   helper function to detect if there exists a cyclic component in the graph.
          it does a BFS traversal, keeps track of the prev node that before pushing
          the node to tempq.
          After popping out an element from tempq, check if the connected nodes
          of the popped out element is visited.If it's visited and the element is not
          the prev node then it means that node had been visited thru other route than 
          the current one - meaning there is a cycle in the graph.
        */

      let tempq = [];
      let tracepath = "";
      let tempobj;

      let prevNode = -1; // intial prevnode is -1,as there is no parent at start.
      let obj = { node: node, prevNode: -1 };
      visitednodes[node] = true;
      tempq.push({ node: node, prevNode: prevNode });

      while (tempq.length) {
        let { node: pop, prevNode } = tempq.shift();
        // console.log(`node:${node},prevnode:${prevNode}`);
        tracepath = tracepath + pop + "- > ";
        let connectednodes = Object.keys(this.nodes[pop]);
        for (let connectednode of connectednodes) {
          if (!visitednodes[connectednode]) {
            tempq.push({ node: connectednode, prevNode: pop });
            visitednodes[connectednode] = true;
          } else {
            if (connectednode != prevNode) {
              return [true, connectednode];
            }
          }
        }
      }
      console.log(tracepath);
      return [false, {}];
    }
    // -------End of function------------.
  }
  // -------End of function------------.
}
// -------End of Class-------

// ---------Data starts---------------------/

let edgeweightarray = [
  ["newtown1", "newtown2", 10],
  ["Theni", "Bodi", 15],
  ["Theni", "Madurai", 75],
  ["Theni", "Trichy", 250],
  //   ["Chennai", "Theni", 500],
  ["Trichy", "Chennai", 250],
  ["Bodi", "Kerala", 75],
];

// ---------Data ends---------------------/

// ------------------Main-------------------------/

let g = new Graph();

testGraph();

// ---------------------
function testGraph() {
  g.addNode("Theni");
  g.addNodesthruarray([
    "Madurai",
    "Trichy",
    "Chennai",
    "Bangalore",
    "Kerala",
    "Bodi",
    "newtown1",
    "newtown2",
  ]);
  g.addEdgeandWeightthruarray(edgeweightarray);
  g.addNode("Salem");
  g.addEdgeandWeightthruarray([["Salem", "Bangalore", 150]]);
  g.addEdgeandWeightthruarray([["Salem", "Chennai", 200]]);
  g.showallNodes();
  g.detectCycleinGraph();
}

// -----------------End of Main-------------------/
