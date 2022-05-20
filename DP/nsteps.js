/*

find the number of ways one can reach the top step given the hopping steps and total no of steps.
steps that can be hoped(hopsteps) , no of steps(higheststep)

(e.g) n= 3 steps , hopsteps=1,2 => possibilites are (1,1,1), (1,2),(2,1)

solution:  Try all possible steps(using 1,2) at each step(1,2).

*/

let startstep = 0; // step from which the count or attempt starts.
let higheststep = 3; // total number of steps.
let possiblesteps = [];
let notpossiblesteps = []; // tracks the failed attempts to reach the destination.
let steppath = " "; // each path of steps to destination is tracked.
let totalpaths = 0; // no of possible steps to reach the destination.

function nsteps(n, steppath, totalpaths) {
  if (n == higheststep) {
    possiblesteps.push(steppath);
    return 1;
  } else if (n >= higheststep) {
    notpossiblesteps.push(steppath);
    return 0;
  }
  steppath = steppath + "1";
  let left = nsteps(n + 1, steppath);
  steppath = steppath.slice(0, steppath.length - 1);

  steppath = steppath + "2";
  let right = nsteps(n + 2, steppath);

  steppath = steppath.slice(0, steppath.length - 1);
  return left + right;
}

// Main function starts.....................

let r = nsteps(startstep, steppath, totalpaths);

console.log("Highest step is ", higheststep);
console.log("Hoping steps are  ", 1, 2);
console.log("possible paths=", possiblesteps);
console.log("Wrong Attempts=", notpossiblesteps);
console.log("Total correct paths=", r);
