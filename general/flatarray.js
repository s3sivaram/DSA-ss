//  flatten an array - recursive
let arr = [[1, 2], 3, [4, [5, [6, 7]]], [[8, [9, 10]]]];

let res = [];
function myFlat(arr, depth) {
  arr.forEach((e) => {
    if (Array.isArray(e) && depth > 0) {
      myFlat(e, depth - 1);
    } else {
      res.push(e);
    }
  });
}
console.log(arr);
myFlat(arr, 2);
console.log(res);
