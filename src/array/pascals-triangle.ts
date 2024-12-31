// DIFFICULTY: Medium
//
// Given an integer numRows, return the first numRows of Pascal's triangle.
//
// In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:
//
// See {@link https://leetcode.com/problems/pascals-triangle/}
export { generate };

// SOLUTION:
function generate(numRows: number): number[][] {
  const triangle: number[][] = [];

  for (let i = 0; i < numRows; i++) {
    // Special case the first row.
    if (i === 0) {
      triangle.push([1]);
      continue;
    }

    // The first and last elements of this row have value 1.
    const current: number[] = [];
    current.push(1);

    // The middle elements gotten by summing pairs of the previous row.
    const previous = triangle[i - 1];
    if (previous.length > 1) {
      for (let j = 1; j < previous.length; j++) {
        current.push(previous[j] + previous[j - 1]);
      }
    }

    // The first and last elements of this row have value 1.
    current.push(1);

    // Push the constructed row onto the triangle.
    triangle.push(current);
  }

  return triangle;
}
