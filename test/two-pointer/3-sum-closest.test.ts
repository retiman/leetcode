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
describe('3 sum closest', () => {
  function threeSumClosest(xs: number[], target: number): number {
    xs.sort((a, b) => a - b);

    let closestSum = Infinity;
    let closestValues: number[] = [];

    for (let i = 0; i < xs.length - 2; i++) {
      // Use the two pointer technique to find the closest triple.
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

        // Update the left and right pointers, and try again.
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
