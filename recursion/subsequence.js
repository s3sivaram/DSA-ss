// subsequence of an array using Iterative method

/* subsequence for 5,1,7
                           []
5 ->                     [5] []
1 ->               [5,1] [5] [1] []
7 -> [5,1,7] [5,1] [5,7] [5] [1,7] [1] [[],7],[]


Procedure for arriving at the above model:
-start from an empty bag.
-for every digit(e.g:5,1,and 7) there are two options 1) take 2) not take.
-with empty bay, two paths are 1) [5] and 2) without taking 5 (i.e)- [].
-repeat the above step untill we utilize all the digits in the sequence - (i.e) for 1 and 7.
-the line that ends applying the last digits in the sequence will give all the combinations.


// Author :s3sivaram@gmail.com - Date:4-May-2022
Iterative Algorithm

- Set the 'pointer' to 0.
- initialize a 'temp' array.
- Calculate the length of the sequence in 'stringlength'.
- Initialize the 'result' as an empty array.
- repeat the below incrementing the pointer by 1 until it reaches the stringlength.
  {  
    -for each element(element is an array) in the 'result' array add the selected sequence and store in 'temp'.
    - copy the elements in 'result' to 'temp'.
    - store the entire 'temp' to 'result'.
    - re-initialize 'temp'
  }



*/

function subIterative() {
  let string = [7, 1, 5];
  // let string = ["a", "b", "c"];
  let result = [];
  result[0] = [];
  let temp = [];
  let stringlength = string.length;
  let pointer = 0;
  while (pointer < stringlength) {
    result.forEach((element) => {
      temp.push([string[pointer], ...element]);
    });
    result = [...temp, ...result];
    temp = [];
    pointer = pointer + 1;
  }
  console.log("-------Subsequence using Iterative method------");
  console.log(result);
  console.log("total combinations is", result.length);
  console.log("-------------------------------");
}

// subIterative();

// ------------------------------------------
//  subsequence using Recursive method.
// finds the desired 'sum' in the sub sequences available.
//
function subRecursive() {
  let result = Array();
  let array = [5, 1, 7];
  let n = array.length;
  let idx = 0;
  let sumneeded = 12;

  function subsequence(idx, result, sum) {
    if (idx >= n) {
      if (sum == sumneeded) {
        console.log("Sub sequence with sum using Recursive method");
        console.log(`sum needed is ${sumneeded}`, result);
      }
      return;
    }
    result.push(array[idx]);
    sum = sum + array[idx];
    subsequence(idx + 1, result, sum);
    result.pop();
    sum = sum - array[idx];
    subsequence(idx + 1, result, sum);
  }
  subsequence(0, result, 0);
}
subRecursive();
