// DIFFICULTY: Medium
//
// A peak element is an element that is strictly greater than its neighbors.
//
// Given a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple
//  peaks, return the index to any of the peaks.
//
// You may imagine that nums[-1] = nums[n] = -∞. In other words, an element is always considered to be strictly greater
// than a neighbor that is outside the array.
//
// You must write an algorithm that runs in O(log(n)) time.
//
// See {@link https://leetcode.com/problems/find-peak-element/}
export { findPeakElement };

// SOLUTION:
//
// This problem is not hard, but the wording is incredibly tricky.  First off, let's talk about linear scan versus
// binary search.  There are only 1000 elements max in the array, so either would work.  However, the problem says that
// the algorithm must run in O(log(n)) time.  This means we have to use binary search.
//
// Yes, binary search will still work even if the array is not sorted.  That's because at each step, we are chasing
// a gradient uphill.  For example, if we see [..., 10, 5, 5, ...] then we know that the elements are RISING in the left
// direction (and then eventually fall, because the left side element is -Infinity).  So, we should slice the array in
// half and look for a peak in the left half; the opposite logic applies if the array is rising to the right.
//
// Secondly, the problem doesn't explicitly say what happens if there are no peaks.  The solution I give throws an error
// if none are found (e.g. [1, 1, 1], or [1, 10, 10, 1]).  Nowhere does LeetCode say what should happen if the inputs
// are invalid (e.g. have no peaks), or that all inputs are valid.  However, it does apply to pass if we assume peaks
// always exist!
function findPeakElement(nums: number[]): number {
  if (nums.length === 1) {
    return 0;
  }

  // Use binary search left-most duplicate approach.
  let left = 0;
  let right = nums.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const prev = mid === 0 ? -Infinity : nums[mid - 1];
    const next = mid === nums.length - 1 ? -Infinity : nums[mid + 1];

    // If we've found a peak, we can simply return it.
    if (nums[mid] > prev && nums[mid] > next) {
      return mid;
    }

    // Otherwise, if the right side number is larger, then a peak must exist somewhere on the right, so update the left
    // boundary.
    if (next > nums[mid]) {
      left = mid + 1;
    }
    // Likewise, if the left side number is larger, then a peak must exist somewhere on the left, so update the right
    // boundary.
    else if (prev > nums[mid]) {
      right = mid;
    }
    // Oh, wait, what if we have a plateau?  Like [..., 10, 10, 10, ...].  We don't know which direction to go, and in
    // fact, binary search would NOT even work here.  Well, the problem doesn't tell you this, but this can never
    // happen with the inputs you are given, haha!
    else {
      throw new Error('there is a plateau in the middle of the array');
    }
  }

  // If we've reached this point, we have possibly found a peak.  In theory, we could have landed on a plateau after
  // running through the binary search, and the problem doesn't say what to do, but it appears you never get any inputs
  // that cause this to happen.
  const mid = left;
  const prev = mid === 0 ? -Infinity : nums[mid - 1];
  const next = mid === nums.length - 1 ? -Infinity : nums[mid + 1];
  if (nums[mid] > prev && nums[mid] > next) {
    return mid;
  }

  // This never happens.  As far as I can tell, you never even get an input with a plateau.
  throw new Error('we landed on a plateau after performing binary search');
}
