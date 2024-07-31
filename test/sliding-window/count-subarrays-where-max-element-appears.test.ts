// DIFFICULTY: Medium
//
// You are given an integer array nums and a positive integer k.
//
// Return the number of subarrays where the maximum element of nums appears at least k times in that subarray.
//
// A subarray is a contiguous sequence of elements within an array.
import fs from 'fs';
import path from 'path';

describe('count subarrays where max element appears at least k times', () => {
  // Use the sliding window technique to count the number of subarrays with at least k elements.
  function countSubarrays(nums: number[], k: number): number {
    const max = Math.max(...nums);

    // We could use a set to store the number of unique windows that match our criterion of having at least k max
    // elements.  To do so, we'd need to store all combination of indices (i, j) where i <= left and j >= right.  We
    // have to do it this way because storing the subarrays themselves would result in 'duplicates' not being counted.
    //
    // For example, consider [1,9,9,9,9,9,1] and k=2 where the window [9,9] can appear multiple times.  Using a set of
    // subarrays would not count the subarrays resulting from 'duplicate' windows.
    //
    // Even worse, using the formula (a * (b + 1)) to compute additional subarrays where a is the number of elements to
    // the left of the window and b is the number of elements to the right of the window does not work.  Normally it
    // would work, but we are trying to compute subarrays for *each* window, which will result in double counting.
    //
    // Even though using a set does work, you will exceed LeetCode's time limits, so you'll need a more clever solution.
    let total = 0;

    // The number of max elements in our window.
    let count = 0;

    for (let left = 0, right = 0; right < nums.length; right++) {
      // Count elements that are equal to the max until we get to k elements.
      if (nums[right] === max) {
        count++;
      }

      // Now that we have k elements or more, shrink the window from the left until we have fewer than k elements.
      while (count >= k) {
        if (nums[left] === max) {
          count--;
        }

        left++;
      }

      // Once left is advanced after there are < k elements, every subarray ending at the right pointer is counted by
      // the value at left.
      total += left;
    }

    return total;
  }

  test('count subarrays - test case 1', async () => {
    expect(countSubarrays([1, 3, 2, 3, 3], 2)).toBe(6);
  });

  test.skip('count subarrays - test case 2', async () => {
    expect(countSubarrays([1, 4, 2, 1], 3)).toBe(0);
  });

  test.skip('count subarrays - test case 3', async () => {
    expect(
      countSubarrays(
        [61, 23, 38, 23, 56, 40, 82, 56, 82, 82, 82, 70, 8, 69, 8, 7, 19, 14, 58, 42, 82, 10, 82, 78, 15, 82],
        2
      )
    ).toBe(224);
  });

  test.skip('count subarrays - test case 4', async () => {
    const data = fs
      .readFileSync(path.join(__dirname, '__data__', 'count-subarrays-where-max-element-appears.test.json'))
      .toString();
    const nums = JSON.parse(data);

    expect(countSubarrays(nums, 13)).toBe(263559);
  });
});
