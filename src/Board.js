// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
      // O(n) time complexity
      // O(n) space complexity
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
      // O(1) time complexity
      // O(1) space complexity
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
      // O(1) time complexity
      // O(1) space complexity
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
      // O(1) time complexity
      // O(1) space complexity
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
      // O(n^2) time complexity
      // O(n) space complexity
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
      // O(n) time complexity
      // O(n) space complexity
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
      // O(n^2) time complexity
      // O(n) space complexity
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
      // O(1) time complexity
      // O(1) space complexity
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // input currentIndex
      // output: true/false
      return this.get(rowIndex).reduce((function(accumulator, element) {
        return accumulator + element;
      }), 0) > 1;
      // O(n) time complexity
      // O(1) space complexity
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // _.range(0, this.get('n')).some(function(item){
      //   return this.hashasRowConflictAt(item);
      // });
      return _.range(0, this.get('n')).some(curRowIndex => this.hasRowConflictAt(curRowIndex));
      // O(n^2) time complexity
      // O(n) space complexity
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // return false; // fixme
      // this.get(i)[colIndex];
      var total = 0;
      var rowTotal = this.get('n');
      for (var row of _.range(0, rowTotal)) {
        total += this.get(row)[colIndex];
      }
      return total > 1;
      // O(n) time complexity
      // O(n) space complexity
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      return _.range(0, this.get('n')).some(curColIndex => this.hasColConflictAt(curColIndex));
      // O(n^2) time complexity
      // O(n) space complexity
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // parameter will be in range [1 -n, n - 1]
      var rowIndexCOl = this.get('n');
      var total = 0;
      for (var curRow of _.range(0, rowIndexCOl)) {
        let col = curRow + majorDiagonalColumnIndexAtFirstRow;
        if (this._isInBounds(curRow, col)) {
          total += this.get(curRow)[col];
        }
      }
      return total > 1;
      // O(n) time complexity
      // O(n) space complexity
    },


    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      let n = this.get('n');
      // return false; // fixme
      return _.range(2 - n, n - 1).some(startingCol => this.hasMajorDiagonalConflictAt(startingCol));
      // O(n^2) time complexity
      // O(n) space complexity
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var rowIndexCol = this.get('n');
      var total = 0;
      for (var curRow of _.range(0, rowIndexCol)) {
        if (this._isInBounds(curRow, minorDiagonalColumnIndexAtFirstRow - curRow)) {
          total += this.get(curRow)[minorDiagonalColumnIndexAtFirstRow - curRow];
        }
      }
      return total > 1;
      // O(n) time complexity
      // O(n) space complexity
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      let n = this.get('n');
      // return false; // fixme
      return _.range(1, 2 * n - 2).some(startingCol => this.hasMinorDiagonalConflictAt(startingCol));
      // O(n^2) time complexity
      // O(n) space complexity
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
