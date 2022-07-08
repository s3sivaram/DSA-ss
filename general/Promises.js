/* Promises in Javascript.

Notes: s3sivaram@gmail.com / 8Jul2022.
---------------------------------------

Promise is an object given to track the progress of a  task that would be completed in future. (Progress stages are 'pending','fulfilled', 'rejected').

A new promise can be created using 'new Promise'.
It takes in an Executor function as an argument.
Executor function takes in 2 callback functions as an argument.
(generally named as 'resolve','reject')-
which will get executed for a fullfilled task(resolve) or for a rejected task(reject) correspondingly.

Stages in Promies: Pending , Settled :(fulfilled/rejected)
------------------
A promise is said to be in a settled stage when it is either resolved or rejected.


Running multiple promises in parallel - can be done using 
Promise.all,Promies.allSettled,Promise.any,Promise.race.

Promise.all[promises]:
---------------------
This method waits for all the promises to resolve and returns the array of promise results. 
If any of the promises reject or execute to fail due to an error, all other promise results will be ignored.
will end up in the catch block if one promise gets rejected.

Promise.any[promises] :
----------------------
This method doesn't wait for all the promises to resolve. It is done when any one of the promises is settled.

Promise.allSettled[promises] :
-----------------------------
This method waits for all promises to settle(resolve/reject) and returns their results as an array of objects. The results will contain a state (fulfilled/rejected) and value, if fulfilled. In case of rejected status, it will return a reason for the error.

Promise.race[promises] :
-----------------------------
It waits for the first (quickest) promise to settle, and returns the result/error accordingly.




---------------------------------------*/

let Promise1 = (msg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("Promise1 done after 5 secs"), 5000);
  });

let Promise2 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => reject("Promise2 rejected after 2 secs "), 2000);
  });
let Promise3 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("Promise3 resolved after 2 secs "), 2000);
  });

async function promisefunction() {
  let p1 = await Promise1("s3").then((r) => console.log(r));
  let p2 = await Promise2()
    .then()
    .catch((e) => console.log(e));
}

// Promise.allSettled([Promise1(), Promise2(), Promise3()])
Promise.any([Promise1(), Promise2(), Promise3()])
  .then((p) => {
    console.log("promise.all- resolved", p);
    // let fulfilled = p.filter((e) => e.status === "fulfilled");
    // let rejected = p.filter((e) => e.status !== "fulfilled");
    // console.log("Fullfilled =", fulfilled);
    // console.log("rejected =", rejected);
  })
  .catch((e) => console.log("promise.all error", e))
  .finally(() => console.log("Finally"));

// promisefunction();
// console.log("Promise 1=", Promise1);

const myPromises = [Promise1, Promise2, Promise3];

async function asyncpromise() {
  // function to perform mutilple promises sequentially.
  for (p of myPromises) {
    try {
      res = await p();
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }
}

// asyncpromise();
