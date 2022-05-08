// return true if the pairs of the brackets in the string is in correct order
// stacklength-2 and stacklength-1 will give the corresponding closing & opening brackets.

let fixedpairs = ["{}", "()", "[]"];
let input = "[{[{}]}]";
// let input = "[]";
let inputarray = [];
let pointer = 0;
while (pointer < input.length) {
  inputarray.push(input.charAt(pointer));
  let leftbracket = inputarray[inputarray.length - 2];
  let rightbracket = inputarray[inputarray.length - 1];
  let formedpairs = leftbracket + rightbracket;
  if (fixedpairs.includes(formedpairs)) {
    inputarray.pop();
    inputarray.pop();
  }
  pointer++;
}
if (inputarray.length) {
  console.log(`${input} does not have matching brackets`);
} else {
  console.log(`${input} has matching brackets`);
}
