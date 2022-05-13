// suduko solver
/*
    Rules:
    - Every row should contain only once a number between 1-9
    - Every column should contain only once a number between 1-9
    - A number should not be repeated again in the matrix.(this rule is specific to this program only)

*/
// ---------------Functions----------------------
function createSudukoBox(size) {
  // creates a suduko empty box of given size as the parameter.
  let sudukobox = [];
  for (let row = 0; row < size; row++) {
    sudukobox[row] = [];
    for (let col = 0; col < size; col++) {
      sudukobox[row][col] = "0";
    }
  }
  return sudukobox;
}
function loadSudukuBox(sudukoBox, sudukuData) {
  //  loads the sudukobox with the given array data.
  for (let row = 0; row < sudukuData.length; row++) {
    for (let col = 0; col < sudukuData.length; col++) {
      sudukoBox[row][col] = JSON.parse(JSON.stringify(sudukuData[row][col]));
    }
  }
  return sudukoBox;
}

function checkNumberCanBePlaced(sudukoBox, row, col, numberToBePlaced) {
  // returns true(1) if a number can be placed in a[row][col] else false(0).
  let noinpos = sudukoBox[row][col];
  if (noinpos == 0) {
    let sudukoBoxlength = sudukoBox.length;
    for (let i = 0; i < sudukoBoxlength; i++) {
      // checks if the given number is already in the specified row , column.
      if (
        sudukoBox[row][i] == numberToBePlaced ||
        sudukoBox[i][col] == numberToBePlaced
      ) {
        return 0; // number can't be placed
      }
    }
    for (let boxrow = 0; boxrow < sudukoBoxlength; boxrow++) {
      for (let boxcol = 0; boxcol < sudukoBoxlength; boxcol++) {
        // checks if the number is already present in the matrix(sudukoBox)
        if (sudukoBox[boxrow][boxcol] == numberToBePlaced) {
          // console.log("number already exist in the box");
          return 0; // number can't be placed
        }
      }
    }
  } else {
    console.log("number already exist in the given position");
    return 0; // number already exist in the given position.
  }
  return 1; // number can be placed
}
function solveSuduko(sudukoBox) {
  for (let boxrow = 0; boxrow < sudukoBox.length; boxrow++) {
    for (let boxcol = 0; boxcol < sudukuBox.length; boxcol++) {
      if (sudukuBox[boxrow][boxcol] == 0) {
        for (let i = 1; i < 10; i++) {
          // check placing 1-9 in the empty slot
          if (checkNumberCanBePlaced(sudukuBox, boxrow, boxcol, i)) {
            sudukoBox[boxrow][boxcol] = i;
            if (solveSuduko(sudukuBox) == true) {
              console.log("suduko answers:", sudukoBox);
              sudukoBox[boxrow][boxcol] = 0;
              // return true; //use this option to stop execution after one solution.
            } else {
              sudukoBox[boxrow][boxcol] = 0;
            }
          }
        }
        return false; // not able to place 1-9 in the available empty spot.
      }
    }
  }
  return true; // there are no empty position in the sudukoBox to be filled, so suduko completed.
}

// --------------------Main---------------------
let sudukuBox = createSudukoBox(3);
let sudukuData = [
  [0, 7, 9],
  [1, 0, 5],
  [3, 0, 2],
];

sudukuBox = loadSudukuBox(sudukuBox, sudukuData);
console.log("un solved suduko", sudukuBox);
solveSuduko(sudukuBox);
