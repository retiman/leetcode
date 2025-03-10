// DIFFICULTY: MEDIUM
//
// You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).
//
// You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate
// another 2D matrix and do the rotation.
//
// See {@link https://leetcode.com/problems/rotate-image/}
export { rotate };

// SOLUTION:
//
// To rotate an image by 90 degrees, we can transpose the matrix (exchange [i, j] with [j, i]), then reverse each
// row.
//
// Generally you can accomplish any number of different rotations by transposition and reversing.
//
// 90 degrees clockwise: transpose, then reverse rows.
// 90 degrees counter-clockwise: transpose, then reverse columns.
// 180 degrees: reverse rows, reverse columns.
// 270 degrees clockwise: same as 90 degrees counter-clockwise.
// 270 degrees counter-clockwise: same as 90 degrees clockwise.
//
// The above approach requires a transposition then reversing each element.  It is O(n^2) for the transpose operation
// but then O(n^2) again for reversals.  A more complicated algorithm can achieve the transposition in a single pass
// through the matrix.
//
// For a 4 element matrix:
//
// - The element at (0, 0) moves to (0, 3).
// - The element at (0, 3) moves to (3, 3).
// - The element at (3, 3) moves to (3, 0).
// - The element at (3, 0) moves to (0, 0).
//
// This pattern applies for the outer layer of the square matrix, then the next layer below that, and so on.  Here
// a "layer" means an square (so the outer square), then the next inner square and so on.
function rotate(matrix: number[][]): void {
  // We'll have to apply our algorithm to each "layer" of our matrix.  For a matrix of size N, there are N/2 layers.
  const n = matrix.length;
  const layers = Math.floor(n / 2);

  // Operate our algorithm for each layer; again, an NxN matrix will have N/2 layers.
  for (let i = 0; i < layers; i++) {
    // By setting j = i, we will descend into an inner layer and process them one by one.  That is, the first square
    // starts at (0, 0), then the next square starts at (1, 1), and so on.
    for (let j = i; j < n - i - 1; j++) {
      // Lets define our 4 points so we can get our cells correctly.
      const left = i;
      const right = n - i - 1;
      const top = j;
      const bottom = n - j - 1;

      // Temporarily save the top left cell so we can swap it later.
      const t = matrix[left][top];

      // The (left row, top column) cell should get the (bottom row, left column) value.
      matrix[left][top] = matrix[bottom][left];

      // The (bottom row, left column) cell should get the (right row, bottom column) value.
      matrix[bottom][left] = matrix[right][bottom];

      // The (right row, bottom column) cell should get the (top row, right column) value.
      matrix[right][bottom] = matrix[top][right];

      // The (top row, right column) cell should get the (top row, left column) value (which we saved).
      matrix[top][right] = t;
    }
  }
}
