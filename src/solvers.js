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
      return true;
    }
    for (var colIndex of _.range(0, n)) {
      solution.togglePiece(rowIndex, colIndex);
      if (!solution.hasAnyRooksConflicts(rowIndex, colIndex)) {
        if (ToggleBoard(rowIndex + 1)) {
          return true;
        }

      }
      solution.togglePiece(rowIndex, colIndex);
    }
  };

  ToggleBoard(0);

  return solution.rows();
  // O(n!) time complexity
  // O() space complexity
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  let all = (1 << n) - 1;

  let countSolutions = (cols) => {
    let solutionCount = 0;
    let poss = ~cols & all;

    while (poss) {
      let bit = poss & -poss; // least significant bit in poss (if poss is 0b0110010, bit is 0b10)
      poss -= bit;
      //console.log(poss.toString(2));
      solutionCount += countSolutions(cols | bit);
    }

    // if cols === all, we've reached a leaf node (i.e., found a solution):
    solutionCount += (cols === all ? 1 : 0);
    return solutionCount;
    // return (cols === all) ? 1 : 0;
  }; // end countSolutions()

  return countSolutions(0);
  // return solutionCount;
};
  // var solutionCount = 0; //fixme
  // var board = new Board({n}); //fixme

  // var ToggleBoard = function (rowIndex) {
  //   if (rowIndex === n) {
  //     solutionCount++;
  //     return;
  //   }
  //   for (var colIndex of _.range(0, n)) {
  //     board.togglePiece(rowIndex, colIndex);
  //     if (!board.hasAnyRooksConflicts(rowIndex, colIndex)) {
  //       ToggleBoard(rowIndex + 1);
  //       // break;
  //     }
  //     board.togglePiece(rowIndex, colIndex);
  //   }
  // };

  // ToggleBoard(0);
  // return solutionCount;
// };

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n}); //fixme
  var solutionFound = false;

  var ToggleBoard = function (rowIndex) {
    if (rowIndex === n) {
      return true;
    }
    for (var colIndex of _.range(0, n)) {
      solution.togglePiece(rowIndex, colIndex);
      if (!solution.hasAnyQueensConflicts()) {
        if (ToggleBoard(rowIndex + 1)) {
          return true;
        }
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
  //let solutionCount = 0; // made this local to the countSolutions() function
  let all = (1 << n) - 1;

  let countSolutions = (ld, cols, rd) => {
    let solutionCount = 0;
    let poss = ~(ld | cols | rd) & all;

    while (poss) {
      let bit = poss & -poss; // least significant bit in poss (if poss is 0b0110010, bit is 0b10)
      poss -= bit;
      solutionCount += countSolutions((ld | bit) << 1, cols | bit, (rd | bit) >> 1);
    }

    // if cols === all, we've reached a leaf node (i.e., found a solution):
    solutionCount += (cols === all ? 1 : 0);
    return solutionCount;
    // return (cols === all) ? 1 : 0;
  }; // end countSolutions()

  return countSolutions(0, 0, 0);
  // return solutionCount;
};
  // var solutionCount = 0; //fixme
  // var solution = new Board({n});
  // // var solutionFound = false;

  // var ToggleBoard = function (rowIndex) {
  //   if (rowIndex === n) {
  //     solutionCount += 1;
  //     return;
  //   }
  //   for (var colIndex of _.range(0, n)) {
  //     solution.togglePiece(rowIndex, colIndex);
  //     if (!solution.hasAnyQueensConflicts()) {
  //       ToggleBoard(rowIndex + 1);
  //       // if (rowIndex === n - 1) {
  //       //   solutionFound = true;
  //       // }
  //       // if (solutionFound) {
  //       //   break;
  //       // }
  //     }
  //     solution.togglePiece(rowIndex, colIndex);
  //   }
  // };

  // ToggleBoard(0);


  // // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  // return solutionCount;
