// DIFFICULTY: MEDIUM
//
// Given an array of integers nums and an integer limit, return the size of the longest non-empty subarray such that the
// absolute difference between any two elements of this subarray is less than or equal to limit.
//
// See {@link https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/}
export { longestSubarray };

// Use a sliding window approach to find the max length subarray.  We'll have to keep track of what the min/max
// elements in the subarray while adjusting our window size.  To do so we'll use two deques.
//
// We'll have a right pointer that moves forward through the array as normal.  The left pointer will move forward
// through the array only when the subarray constraint (under limit) is violated.  As the pointers move, we'll need
// to keep track of the smallest and largest elements; that's what the deques are for.
//
// We can't simply store the max element or min element by itself; as the pointers move, these elements will change.
// Instead, we'll have to use our deques to maintain the max/min elements at every window size.  The `minDeque` will
// have elements in increasing order, and the `maxDeque` will have elements in decreasing order.  We keep the deques
// organized like this so that the largest element will always be at the front of the `maxDeque`, and the smallest
// element will always be at the front of the `minDeque`.
//
// As we advance the right pointer, we'll have to pop off elements at the back of the deque and then push the right
// pointer onto the end of the deque, while maintaining the ascending/descending order.  As we advance the left
// pointer, we'll shift off the element at the front of the deque if it is less than what we just passed.
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

      // If we've moved past the min index, remove the min index from the front of the deque.  Note that we are
      // comparing indices here, not actual values.
      if (minDeque[0] < left) {
        minDeque.shift();
      }

      // Alternatively, if we've moved past the max index, remove the max index from the front of the deque.  Note
      // that we are comparing indices here, not actual values.
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
