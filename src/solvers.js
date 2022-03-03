/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({n}); //fixme

  var ToggleBoard = function (rowIndex) {
    if (rowIndex === n) {
      return;
    }
    for (var colIndex of _.range(0, n)) {
      solution.togglePiece(rowIndex, colIndex);
      if (!solution.hasAnyRooksConflicts(rowIndex, colIndex)) {
        ToggleBoard(rowIndex + 1);
        break;
      }
      solution.togglePiece(rowIndex, colIndex);
    }
  };

  ToggleBoard(0);

  return solution.rows();
  // instantiate the board and set value to 0;
  // helper function to traverse the board from the top anf the bottom and add available slot into the result row by row
    // function (index) {
      // if index === totalRows:
      // return
      // for (curIndex in range of (board[index])) {
      //  toggle the current pistion to change the value(add rook)
      // if there is no conflic, recursively call function(index+1);
        // togglr the current posiyion again to change back to 0
      // }
    // }
  // Once traversing to the ;ast row of the board, return the result

  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n}); //fixme

  var ToggleBoard = function (rowIndex) {
    if (rowIndex === n) {
      solutionCount++;
      return;
    }
    for (var colIndex of _.range(0, n)) {
      board.togglePiece(rowIndex, colIndex);
      if (!board.hasAnyRooksConflicts(rowIndex, colIndex)) {
        ToggleBoard(rowIndex + 1);
        // break;
      }
      board.togglePiece(rowIndex, colIndex);
    }
  };

  ToggleBoard(0);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n}); //fixme

  var ToggleBoard = function (rowIndex) {
    if (rowIndex === n) {
      return;
    }
    for (var colIndex of _.range(0, n)) {
      solution.togglePiece(rowIndex, colIndex);
      if (!solution.hasAnyQueensConflicts()) {
        ToggleBoard(rowIndex + 1);
        // break;
      }
      solution.togglePiece(rowIndex, colIndex);
    }
  };

  ToggleBoard(0);

  return solution.rows();
  // var solution = undefined; //fixme

  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  // return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
