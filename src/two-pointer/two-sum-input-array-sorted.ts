// DIFFICULTY: MEDIUM
//
// Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such
// that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where
// 1 <= index1 < index2 <= numbers.length.
//
// Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of
// length 2.
//
// The tests are generated such that there is exactly one solution. You may not use the same element twice.
//
// Your solution must use only constant extra space.
//
// See {@link https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/}
export { twoSum };

// SOLUTION:
//
// Use the two pointer approach to narrow in on the target sum from both the left and the right.
function twoSum(xs: number[], target: number) {
  let left = 0;
  let right = xs.length - 1;

  while (left < right) {
    const sum = xs[left] + xs[right];
    if (sum === target) {
      return [left + 1, right + 1];
    }

    if (sum < target) {
      left++;
    }

    if (sum > target) {
      right--;
    }
  }

  return [];
}
