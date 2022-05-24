// given 3 coin denomination , pick the minimum no of coins that gives the sum of given total.
// s3sivaram@gmail.com / 24May22.

let answers = [];
let wronganswers = [];
let coin1 = 1;
let coin2 = 3;
let coin3 = 5;
let total = 5;
let steppath = "";
let c1 = 0;
let c2 = 0;

function coins(n, steppath) {
  // console.log("n=", n);
  if (n == total) {
    answers.push(steppath);
    // console.log("total=", total);
    // console.log("steppath =", steppath);
    // console.log("steppath length", steppath.length);
    return steppath.length;
  } else if (n > total) {
    wronganswers.push(steppath);
    return 100;
  } else {
    // c3 = c3 + coin3;
    steppath = steppath + String(coin3);
    console.log("coin3 steppath before=", steppath);
    let right2 = coins(n + coin3, steppath);
    steppath = steppath.slice(0, steppath.length - 1);

    // c1 = c1 + coin1;
    steppath = steppath + String(coin1);
    let left = coins(n + coin1, steppath);
    console.log("coin1 steppath before=", steppath);
    steppath = steppath.slice(0, steppath.length - 1);
    // console.log("steppath after=", steppath);

    // c2 = c2 + coin2;
    steppath = steppath + String(coin2);
    console.log("coin2 steppath before=", steppath);
    let right = coins(n + coin2, steppath);
    steppath = steppath.slice(0, steppath.length - 1);

    return Math.min(left, right, right2);
  }
}

let r = coins(0, steppath);
console.log("coins are ", coin1, coin2, coin3);
console.log("Total to be achieved is", total);
console.log("minimum coins", r);
console.log("all possible Answers", answers);
console.log("wrong Answers", wronganswers);
