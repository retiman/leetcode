// DIFFICULTY: MEDIUM
//
// Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix. If there is no clear
// path, return -1.
//
// A clear path in a binary matrix is a path from the top-left cell (i.e., (0, 0)) to the bottom-right cell
// (i.e., (n - 1, n - 1)) such that:
//
// - All the visited cells of the path are 0.
// - All the adjacent cells of the path are 8-directionally connected (i.e., they are different and they share an edge
//   or a corner).
// - The length of a clear path is the number of visited cells of this path.
//
// See {@link https://leetcode.com/problems/shortest-path-in-binary-matrix/}
export { shortestPathBinaryMatrix };

// SOLUTION:
//
// Can be solved using BFS.  Just start from the top left cell and explore adjacent cells that have 0 value.
function shortestPathBinaryMatrix(grid: number[][]): number {
  // The problem says that you MUST start at the top left, so if the top left cell is 1, you have nowhere to go.
  if (grid[0][0] === 1) {
    return -1;
  }

  let shortest = Infinity;
  const visited = new Set<string>();
  const queue = [
    {
      position: [0, 0],
      length: 1
    }
  ];
  while (queue.length > 0) {
    const cell = queue.shift()!;
    const [x, y] = cell.position;

    // Store the cell as a string in a set, since we can't store the object directly.
    const key = `${x},${y}`;
    if (visited.has(key)) {
      continue;
    }

    // If we are at the very last cell, update the minimum path length.
    if (x === grid.length - 1 && y === grid[0].length - 1) {
      shortest = Math.min(shortest, cell.length);
    }

    // Since we can explore all 8 directions, we'll have to generate coordinates and filter out the ones that don't
    // make sense before we jam them onto the queue.
    const coordinates = [
      [x - 1, y],
      [x, y - 1],
      [x - 1, y - 1],
      [x + 1, y],
      [x, y + 1],
      [x + 1, y + 1],
      [x - 1, y + 1],
      [x + 1, y - 1]
    ];
    const frontier = coordinates
      .filter(([x, y]) => x >= 0 && x < grid.length && y >= 0 && y < grid[0].length && grid[x][y] === 0)
      .map(p => {
        return {
          position: p,
          length: cell.length + 1
        };
      });

    // Update the visited set and push the frontier cells onto the queue.
    visited.add(key);
    queue.push(...frontier);
  }

  return shortest === Infinity ? -1 : shortest;
}
