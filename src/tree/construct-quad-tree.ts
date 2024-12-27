// DIFFICULTY: Hard
//
// Given a n * n matrix grid of 0's and 1's only. We want to represent grid with a Quad-Tree.
//
// Return the root of the Quad-Tree representing grid.
//
// See https://leetcode.com/problems/construct-quad-tree/
// See https://en.wikipedia.org/wiki/Quadtree
import { _Node } from './common/quad-tree';
export { construct };

// SOLUTION:
//
// To make a quad tree, recursively divide the matrix into quadrants until each quadrant is all 1's or all 0's.
function construct(_grid: number[][]): _Node | null {
  if (_grid.length === 0 || _grid[0].length === 0) {
    return null;
  }

  return constructInternal(_grid, 0, 0, _grid.length);
}

function constructInternal(grid: number[][], row: number, column: number, size: number): _Node {
  const node = new _Node();

  // If the grid segment is uniform, we can create a single quad tree node and set the value to all 1's or 0's.
  if (isUniform(grid, row, column, size)) {
    node.val = grid[row][column] === 1;
    node.isLeaf = true;
    return node;
  }

  // If the grid segment here isn't uniform, we'll need to create 4 quadrants and construct nodes out of all 4 of
  // them.
  //
  // Setting the `node.val` of this node is irrelevant as it's not a leaf.  We can just use the default value.
  const half = size / 2;
  node.isLeaf = false;
  node.topLeft = constructInternal(grid, row, column, half);
  node.topRight = constructInternal(grid, row, column + half, half);
  node.bottomLeft = constructInternal(grid, row + half, column, half);
  node.bottomRight = constructInternal(grid, row + half, column + half, half);

  return node;
}

// Checks if a quadrant of the grid starting at [row, column] is uniformly all 1's or all 0's.
function isUniform(grid: number[][], row: number, column: number, size: number) {
  const value = grid[row][column];
  for (let i = row; i < row + size; i++) {
    for (let j = column; j < column + size; j++) {
      if (grid[i][j] !== value) {
        return false;
      }
    }
  }

  return true;
}
