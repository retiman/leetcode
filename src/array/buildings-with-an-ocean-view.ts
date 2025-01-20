// DIFFICULTY: MEDIUM
//
// There are n buildings in a line. You are given an integer array heights of size n that represents the heights of the
// buildings in the line.
//
// The ocean is to the right of the buildings. A building has an ocean view if the building can see the ocean without
// obstructions. Formally, a building has an ocean view if all the buildings to its right have a smaller height.
//
// Return a list of indices (0-indexed) of buildings that have an ocean view, sorted in increasing order.
//
// See {@link https://leetcode.com/problems/buildings-with-an-ocean-view/}
export { findBuildings };

// SOLUTION:
//
// This is easier to do iterating from right to left (since the ocean is to the right).  We can keep track of the
// tallest building we've seen so far, and if we encounter a building that is taller, we can add it to the list with
// ocean views.
//
// COMPLEXITY:
//
// Time complexity is O(n) because we are iterating through the list of buildings once.  Space complexity is O(n)
// because we are storing a result array.
function findBuildings(heights: number[]): number[] {
  const result: number[] = [];
  let tallest = -Infinity;

  for (let i = heights.length - 1; i >= 0; i--) {
    const height = heights[i];
    if (height > tallest) {
      tallest = height;
      result.push(i);
    }
  }

  // Problem says the buildings can't be in any order; they have to be in increasing order (of index, not height).
  return result.reverse();
}
