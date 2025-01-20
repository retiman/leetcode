// DIFFICULTY: MEDIUM
//
// Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.
//
// If target is not found in the array, return [-1, -1].
//
// You must write an algorithm with O(log n) runtime complexity.
//
// @see {@link https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/}
export { searchRange };

// SOLUTION:
//
// The problem stipulates it must run in O(log n) time complexity, so that means we can't just do a standard binary
// search and then a linear scan for the start and end ranges.
//
// The most braindead simple way to do this is to do binary search twice.  Once using the left-most duplicate technique
// and once using the right-most duplicate technique.
//
// Technically we could combine both the left and right searches into one binary search, using a flag to denote the
// direction we are searching in.  But that would be a bit more complex and harder to understand.
//
// COMPLEXITY:
//
// Runs in O(log n) time complexity because of max two binary searches.  Uses O(1) space complexity.
function searchRange(nums: number[], target: number): number[] {
  // Run binary search using the left-most duplicate technique.  Here if we find that the the middle element is less
  // than the target, we move to the right.
  //
  // Otherwise if the middle element is greater than or equal to the target, we move to the left (guaranteeing that if
  // we find a duplicate target, we will keep moving left).
  function binarySearchLeft() {
    let left = 0;
    let right = nums.length;

    while (left < right) {
      const m = Math.floor((left + right) / 2);
      if (nums[m] < target) {
        left = m + 1;
      } else {
        right = m;
      }
    }

    // If we have found the target, return the index, otherwise return -1.
    if (left < nums.length && nums[left] === target) {
      return left;
    } else {
      return -1;
    }
  }

  // Run binary search using the right-most duplicate technique.  Here if we find that the the middle element is greater
  // than the target, we move to the left.
  //
  // Otherwise if the middle element is less than or equal to the target, we move to the right (guaranteeing that if
  // we find a duplicate target, we will keep moving right).
  function binarySearchRight() {
    let left = 0;
    let right = nums.length;

    while (left < right) {
      const m = Math.floor((left + right) / 2);
      if (nums[m] > target) {
        right = m;
      } else {
        left = m + 1;
      }
    }

    if (right > 0 && nums[right - 1] === target) {
      return right - 1;
    } else {
      return -1;
    }
  }

  // Now we just run both binary searches and return the range.
  const left = binarySearchLeft();
  if (left === -1) {
    return [-1, -1];
  }

  const right = binarySearchRight();
  return [left, right];
}
