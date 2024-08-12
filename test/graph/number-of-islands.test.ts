// DIFFICULTY: Medium
//
// Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of
// islands.
//
// An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may
// assume all four edges of the grid are all surrounded by water.
//
// See https://leetcode.com/problems/number-of-islands/
describe('number of islands', () => {
  // We can execute DFS from every land mass to find connected land masses.  Each connected land mass constitutes 1
  // island.
  //
  // We can either store the coordinates (i, j) in a set to avoid visiting the same cell twice, or we can simply write
  // to the cell '0' for a visited land mass.  The latter will also avoid visiting the same cell twice.  We do the
  // latter because that's what most interviewers want to see.
  function numIslands(grid: string[][]) {
    let count = 0;

    // Use DFS to find all connected land masses.  Avoid doing DFS calls to any coordinates that are out of bounds, and
    // mark cells as visited by writing '0' (water) to them.
    function dfs(m: string[][], i: number, j: number) {
      if (m[i][j] === '0') {
        return;
      }

      m[i][j] = '0';

      if (j + 1 < m[i].length) {
        dfs(m, i, j + 1);
      }

      if (j - 1 >= 0) {
        dfs(m, i, j - 1);
      }

      if (i - 1 >= 0) {
        dfs(m, i - 1, j);
      }

      if (i + 1 < m.length) {
        dfs(m, i + 1, j);
      }
    }

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === '0') {
          continue;
        }

        dfs(grid, i, j);
        count++;
      }
    }

    return count;
  }

  test('number of islands - test case 1', async () => {
    const grid = [
      ['1', '1', '1', '1', '0'],
      ['1', '1', '0', '1', '0'],
      ['1', '1', '0', '0', '0'],
      ['0', '0', '0', '0', '0']
    ];

    expect(numIslands(grid)).toBe(1);
  });
});
