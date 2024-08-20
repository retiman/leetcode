// DIFFICULTY: Medium
//
// Given an integer array nums, find the subarray with the largest sum, and return its sum.
//
// See https://leetcode.com/problems/maximum-subarray/
describe('maximum subarray', () => {
  // Kadane's algorithm finds a solution in O(n) with O(1) extra space.
  //
  // The idea is to consider subarrays starting from the 0th, 1st, 2nd, etc element.  However, it is not necessary to
  // consider the subarrays starting from 0, then 1, then 2, etc.
  //
  // It is enough to note that if all elements are positive, you want the entire array.  But if they are not all
  // positive, then you want to only take elements until it's "not worth it".  To determine what is "not worth it",
  // consider that if you start from the 0th index and continue to take elements, but the subarray sum becomes negative
  // when it was positive before.  Then we know to abandon the entire subarray from 0 to that element.
  //
  // Generalizing, suppose we have a current subarray sum, and we add the next element.  If adding that next element
  // causes the new current sum to be *less* than just that element by itself, we should abandon that subarray and
  // start over.
  function maxSubArray(xs: number[]): number {
    if (xs.length === 0) {
      return 0;
    }

    if (xs.length === 1) {
      return xs[0];
    }

    // Start calculating the sum of the current subarray at i = 0.
    let current = xs[0];
    let max = xs[0];
    for (let i = 1; i < xs.length; i++) {
      const x = xs[i];

      if (current + x > x) {
        // If adding x makes our current sum larger, we'll take x and add it to our potential max subarray sum.
        current += x;
      } else {
        // However, if adding x makes our current sum smaller, abandon the current subarray that was from where we
        // started to i.  We'll start counting the sum from a new subarray, starting at i instead.
        current = x;
      }

      max = Math.max(current, max);
    }

    return max;
  }

  test('maximum subarray - test case 1', async () => {
    expect(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6);
  });
});
