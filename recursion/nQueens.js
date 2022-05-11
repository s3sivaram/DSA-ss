// N queens problem - Date:11-May-2022.
/*
Rules:
- every row should have 1 queen.
- every column should have 1 queen.
- queen placed should not class as per queens navigation rule.
logic:
A recursive solution that will try all possible ways of placing the queen.
- NxN matrix chessboard - this is split as N columns and N rows.
1) One queen is placed in the first  column,first row if it's safe to be placed.(isSafe will return true if safe according to the rules).
2) the next queen will be tried to be placed in the next column, first row - if isSafe returns 'not safe' , then the queen will be tried to be placed in the next row of the same column.
3) this process will be tried for all the rows in that column.
4) If not possible to be placed in any of the rows on that column, then the queen's position in the first column will be moved to the next row.
5) Repeat this process recursively till u place one queen in all the columns.
- Reference: Youtubechannel - take u forward.https://www.takeuforward.org/
*/
//
let answer = [];
let board = createBoard(4); //  chessboard
let boardsize = board.length; // chessboard length
let rowMap = new Map(); // formula is row.
let lowerDiagonalMap = new Map(); // formula is row + column.
let upperDiagonalMap = new Map(); // formula is (n-1)+(column-row)).
function createBoard(size) {
  // creates a board (of size x size -2D matrix array)
  let board = [];
  for (let row = 0; row < size; row++) {
    board[row] = [];
    for (let column = 0; column < size; column++) {
      board[row][column] = ".";
    }
  }
  return board;
}

function setMap(row, column) {
  // sets the hash map for row, upperdiagonal & lower diagonal on the board
  rowMap.set(row, 1);
  lowerDiagonalMap.set(row + column, 1);
  upperDiagonalMap.set(boardsize - 1 + (column - row), 1);
}
function removeMap(row, column) {
  // sets the hash map for row, upperdiagonal & lower diagonal on the board
  rowMap.delete(row);
  lowerDiagonalMap.delete(row + column);
  upperDiagonalMap.delete(boardsize - 1 + (column - row));
}

function isSafe(row, column) {
  if (
    // checks if queen can be placed safely - row wise,column wise and diagonaly.
    rowMap.has(row) ||
    lowerDiagonalMap.has(row + column) || // nxn matrix cumulative sum strategy.
    upperDiagonalMap.has(boardsize - 1 + (column - row)) // nxn formula for finding the diagonals.
  ) {
    // Not safe
    return 0;
  }
  // safe
  else return 1;
}

function nQueen(boardsize, board, column, answer) {
  // base condition - when col reaches the boardsize
  if (column == boardsize) {
    // deep copy of board into answer array.
    answer.push(JSON.parse(JSON.stringify(board)));
    return;
  }
  for (let row = 0; row < boardsize; row++) {
    if (isSafe(row, column)) {
      setMap(row, column);
      board[row][column] = "Q";
      nQueen(boardsize, board, column + 1, answer);
      removeMap(row, column);
      board[row][column] = ".";
    }
  }
}

// nQueen function parameters-boardsize, board, col, answer.
nQueen(boardsize, board, 0, answer);
console.log(
  `There are ${answer.length}ways to place Queens in  ${boardsize}x${boardsize} `
);
console.log(answer);
