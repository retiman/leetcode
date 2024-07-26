// DIFFICULTY: Medium
//
// Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is
// closest to target.
//
// Return the sum of the three integers.
//
// You may assume that each input would have exactly one solution.
//
// See https://leetcode.com/problems/3sum-closest/
describe('three sum closest', () => {
  // We'll use the two pointer technique to zero in on the target sum while iterating through the array.  To make
  // calculations easier, we have to sort the array.
  function threeSumClosest(xs: number[], target: number): number {
    xs.sort((a, b) => a - b);

    let closestSum = Infinity;
    let closestValues: number[] = [];

    for (let i = 0; i < xs.length - 2; i++) {
      // Use the two pointer technique to find the closest triple.  We will move the left pointer forward, or move the
      // right pointer backwards as we attempt to get close to our target sum.
      //
      // Initialize the left pointer to the right of i, and initialize the right pointer at the end of the array.  We
      // will begin moving the left and right pointers closer to each other as we attempt to compute the triple.
      let left = i + 1;
      let right = xs.length - 1;

      while (left < right) {
        // If the current sum is closer than what we have, update the closest sum and the triple.
        const currentSum = xs[i] + xs[left] + xs[right];
        const currentDistance = Math.abs(currentSum - target);
        const closestDistance = Math.abs(closestSum - target);
        if (currentDistance < closestDistance) {
          closestSum = currentSum;
          closestValues = [xs[i], xs[left], xs[right]];
        }

        // If we've matched the target sum, just return right away.
        if (closestSum === target) {
          return closestValues.reduce((a, b) => a + b);
        }

        // Update the left and right pointers, and try again.  Because we've sorted the array, we can move the pointers
        // accordingly.  If the sum is too small, move the left pointer forwards.  If the sum is too big, move the
        // the right pointer backwards.
        if (currentSum < target) {
          left++;
        } else {
          right--;
        }
      }
    }

    return closestValues.reduce((a, b) => a + b);
  }

  test('test case 1', async () => {
    expect(threeSumClosest([-1, 2, 1, -4], 1)).toStrictEqual(2);
  });

  test('test case 2', async () => {
    expect(threeSumClosest([0, 0, 0], 1)).toStrictEqual(0);
  });
});
