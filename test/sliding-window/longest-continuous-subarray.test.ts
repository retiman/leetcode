// DIFFICULTY: Medium
//
// Given an array of integers nums and an integer limit, return the size of the longest non-empty subarray such that the
// absolute difference between any two elements of this subarray is less than or equal to limit.
//
// See https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/
describe('longest continuous subarray with absolute diff less than or equal to limit', () => {
  // Use a sliding window approach to find the max length subarray.  We'll have to keep track of what the min/max
  // elements in the subarray while adjusting our window size.  To do so we'll use two deques.
  function longestSubarray(nums: number[], limit: number): number {
    type Index = number;

    // Keeps track of indices whose values are in descending order.  This will allow us to quickly find the index of the
    // largest element as the window shifts.
    const maxDeque: Index[] = [];

    // Keeps track of indices whose values are in ascending order.  This will allow us to quickly find the index of the
    // smallest element as the window shifts.
    const minDeque: Index[] = [];

    // The current max length of a continuous subarray.
    let result = 0;

    function last(deque: Index[]) {
      return deque[deque.length - 1];
    }

    // Expand the right window while updating our deques.  Each element we encounter from the right side will be used
    // to update our deques.
    for (let left = 0, right = 0; right < nums.length; right++) {
      const value = nums[right];

      // Update the max deque by removing all elements at the end of the deque that are smaller, so we can maintain a
      // deque in descending order.
      while (nums[last(maxDeque)] <= value) {
        maxDeque.pop();
      }
      maxDeque.push(right);

      // Update the min deque by removing all elements at the end of the deque that are bigger, so we can maintain a
      // deque in ascending order.
      while (nums[last(minDeque)] >= value) {
        minDeque.pop();
      }
      minDeque.push(right);

      // Check the conditions of our subarray; if we have exceeded the limit, move the left pointer until we are under
      // the limit.
      //
      // After moving the left pointer, it could be the case that we have to update our min/max deque as it is no longer
      // being considered as part of the subarray.
      let min = minDeque[0];
      let max = maxDeque[0];
      while (Math.abs(nums[max] - nums[min]) > limit) {
        left++;

        // If we've moved past the min value, remove the min value from the front of the deque.
        if (minDeque[0] < left) {
          minDeque.shift();
        }

        // Alternatively, if we've moved past the max value, remove the max value from the front of the deque.
        if (maxDeque[0] < left) {
          maxDeque.shift();
        }

        min = minDeque[0];
        max = maxDeque[0];
      }

      // Update our assumptions of the max length of the subarray.
      const length = right - left + 1;
      result = Math.max(result, length);
    }

    return result;
  }

  test('test case 1', async () => {
    expect(longestSubarray([8, 2, 4, 7], 4)).toBe(2);
  });

  test('test case 2', async () => {
    expect(longestSubarray([10, 1, 2, 4, 7, 2], 5)).toBe(4);
  });

  test('test case 3', async () => {
    expect(longestSubarray([4, 2, 2, 2, 4, 4, 2, 2], 0)).toBe(3);
  });

  test('test case 4', async () => {
    expect(longestSubarray([1, 5, 6, 7, 8, 10, 6, 5, 6], 4)).toBe(5);
  });
});
