// DIFFICULTY: Medium
//
// You are given an integer array nums and an integer k. Find the maximum subarray sum of all the subarrays of nums that
// meet the following conditions:
//
// - The length of the subarray is k, and
// - All the elements of the subarray are distinct.
//
// Return the maximum subarray sum of all the subarrays that meet the conditions. If no subarray meets the conditions,
// return 0.
//
// A subarray is a contiguous non-empty sequence of elements within an array.
//
// See https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k
describe('max sum of distincts subarray with length k', () => {
  // Without the distinct requirement, we can use the sliding window technique with a window of size k, shifting the
  // window as we look for the maximum sum.
  //
  // With the distinct element requirement, we need to maintain a set and disregard sub arrays that don't have unique
  // elements.
  function maximumSubarraySum(xs: number[], k: number): number {
    let current = 0;
    let max = 0;
    let left = 0;
    let right = 0;

    // Define a set to check if we have a distinct sub array, and define the left pointer of our sliding window.  We
    // will update the window based on uniqueness and compute a sum when we have k elements.
    const uniques = new Set<number>();

    // Build up our window by moving the right pointer.  We'll update the left pointer along the way in case we
    // detect a sub array with duplicate elements.
    while (right < xs.length) {
      const value = xs[right];

      // If the current element is already in the sub array, advance the left pointer until we no longer have a
      // duplicate element.  We'll have to decrement the current sum to account for sliding the left pointer forward.
      while (uniques.has(value)) {
        uniques.delete(xs[left]);
        current -= xs[left];
        left++;
      }

      // Now that the sub array is free of dupes, we can add the current element to the sum.  Let's not update the
      // right pointer just yet; if we are over k elements, we want to leave the right pointer where it is for the
      // moment.
      current += value;
      uniques.add(value);

      // If, by adding this element, we've gone over k elements, shrink the window by moving the left pointer, which
      // should put us at exactly k elements.
      //
      // Note that we can check if we've violated the size constraint by checking the size of the `uniques` set, which
      // forms our contiguous set.  By adding a single element, the most we could've gone over by is one element, so
      // just check, and if we've done so, slide the left pointer forward again.
      //
      // Once within constraints we can fall through to the next block.
      if (uniques.size > k) {
        uniques.delete(xs[left]);
        current -= xs[left];
        left++;
      }

      // If the sub array has exactly k elements at this iteration (or after we've shrink the window), update our
      // assumptions about the max sum and update the right pointer.
      //
      // Note that the continue statements are unnecessary but are added for clarity.
      if (uniques.size === k) {
        max = Math.max(current, max);
        right++;
        continue;
      }

      // If the sub array has fewer than k elements, grow the window by increasing the right pointer.
      if (uniques.size < k) {
        right++;
        continue;
      }
    }

    return max;
  }

  test('test case 1', async () => {
    expect(maximumSubarraySum([1, 5, 4, 2, 9, 9, 9], 3)).toBe(15);
  });

  test('test case 2', async () => {
    expect(maximumSubarraySum([4, 4, 4], 3)).toBe(0);
  });
});
