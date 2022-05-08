// Permutation using a recursive function.
// Permutation for ['a','b','c']
//                                             []
// 'a' ->                                     ['a']
// 'b' ->                              ['b','a']-['a','b']
// 'c' -> ['c','b','a']['b','c','a]['b','a','c']-['c','a','b']['a','c','b']['a','b','c']

// Procedure to derive at the above model:-
// - start with an empty array -(i.e)called as the 'result' array
// -for each element in the 'result' array add the first element('a') at every position(i.e-front
//  and back)
// repeat the above step for all the elements in the sequence.
// at the the end of adding the last element - the 'result' array will be filled with all the
// permutations.

// Author:s3sivaram@gmail.com Date:5-May-2022

let sequence = ["a", "b", "c"];
let idx = 0;
let sequencelength = sequence.length;
let result = [[]];
function permute(idx, element, result) {
  if (idx == sequencelength) {
    console.log(result);
    console.log(`${result.length} no of permutations `);
    return;
  }
  let temp = [];
  result.forEach((element) => {
    // add the element to the front & back of each element in the result array
    for (let i = 0; i <= element.length; i++) {
      temp.push([...element.slice(0, i), sequence[idx], ...element.slice(i)]);
    }
  });
  result = [...temp];
  permute(idx + 1, sequence[idx + 1], result);
}

permute(idx, sequence[idx], result);
