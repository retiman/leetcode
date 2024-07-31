// DIFFICULTY: Medium
//
// Given an m x n grid of characters board and a string word, return true if word exists in the grid.
//
// The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or
// vertically neighboring. The same letter cell may not be used more than once.
//
// See https://leetcode.com/problems/word-search/
describe('word search i', () => {
  // This is just DFS; no need to build a prefix trie, in comparison to word search ii.  BFS isn't going to work as well
  // because BFS will generate all possible words incrementally, whereas we want to just stop if we've found our word.
  function exist(board: string[][], word: string): boolean {
    if (word.length === 0) {
      return false;
    }

    let found = false;

    // Here, as we do DFS, we are only going to go down paths that match the next character.  So while we could build
    // up a current: string as we go along, we do not need to.  We just need to select DFS paths that correspond to
    // the correct letter, and maintain the index of the letter that we are looking at.
    function dfs(row: number, column: number, index: number) {
      if (found) {
        return;
      }

      // Only continue down this path if the row is within bounds.
      if (row < 0 || row >= board.length) {
        return;
      }

      // Only continue down this path if the column is within bounds.
      if (column < 0 || column >= board[row].length) {
        return;
      }

      // Only continue down this path if we've not visited this cell before.
      if (board[row][column] === '#') {
        return;
      }

      // Only continue down this path if our current string has fewer characters than our target.
      if (index === word.length) {
        return;
      }

      // Only continue down this path if the current character is one that we want.
      const c = board[row][column];
      const want = word[index];
      if (c !== want) {
        return;
      }

      // If we have reached the last index, check if we've found our target.
      if (index === word.length - 1) {
        found = true;
        return;
      }

      // Save this row/column's value so we can mark it as visited; we'll use a sentinel value to do so.
      board[row][column] = '#';

      dfs(row, column - 1, index + 1);
      dfs(row, column + 1, index + 1);
      dfs(row - 1, column, index + 1);
      dfs(row + 1, column, index + 1);

      board[row][column] = c;
    }

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        // Only start a DFS search if the word begins with the character we are looking at.
        if (board[i][j] === word[0]) {
          dfs(i, j, 0);
        }

        // If we've found the target, return immediately.
        if (found) {
          return true;
        }
      }
    }

    return false;
  }

  test('word search i - test case 1', async () => {
    const board = [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E']
    ];
    const word = 'ABCCED';

    expect(exist(board, word)).toBe(true);
  });
});
