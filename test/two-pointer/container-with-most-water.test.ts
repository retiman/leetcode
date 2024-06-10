// DIFFICULTY: Medium
//
// You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of
// the ith line are (i, 0) and (i, height[i]).
//
// Find two lines that together with the x-axis form a container, such that the container contains the most water.
//
// Return the maximum amount of water a container can store.
//
// Notice that you may not slant the container.
//
// See https://leetcode.com/problems/container-with-most-water/
describe('container with most water', () => {
  function maxArea(xs: number[]): number {
    let max = 0;
    let left = 0;
    let right = xs.length - 1;

    // Use the two pointers technique to maximize the area.  We'll initialize at the left and right sides of the array,
    // then advance the pointers inward and update our knowledge of the maximum area.
    while (left < right) {
      // Set the width to be the difference between left and right pointers.  The height should be the smaller of the
      // two heights referenced by the pointers.
      const width = right - left;
      const height = Math.min(xs[left], xs[right]);

      // Update the max area.
      max = Math.max(max, width * height);

      // Now advance the pointers.
      //
      // No matter which pointer we choose to advance, the width will decrease.  Try to compensate for the resulting
      // difference by advancing the pointer that points to the smaller height first.
      if (xs[left] < xs[right]) {
        left++;
      } else {
        right--;
      }
    }

    return max;
  }

  test('run', async () => {
    expect(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
  });
});
