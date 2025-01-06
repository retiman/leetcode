// DIFFICULTY: Medium
//
// Given an array of integers nums and an integer threshold, we will choose a positive integer divisor, divide all the
// array by it, and sum the division's result. Find the smallest divisor such that the result mentioned above is less
// than or equal to threshold.
//
// Each result of the division is rounded to the nearest integer greater than or equal to that element.
// (For example: 7/3 = 3 and 10/2 = 5).
//
// The test cases are generated so that there will be an answer.
//
// See {@link https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/}
export { smallestDivisor };

// SOLUTION:
//
// The smallest divisor is 1.  This would maximize the sum.
//
// The largest divisor is Math.max(...nums).  This would minimize the sum.
//
// We want a sum that is exactly the threshold or just belong.  This is a good candidate to use binary search.
function smallestDivisor(nums: number[], threshold: number): number {
  function sum(xs: number[], divisor: number) {
    // We do Math.ceil because the problem asks us to round up.
    return xs.map(x => Math.ceil(x / divisor)).reduce((a, b) => a + b);
  }

  // Use the insert point binary search approach to find the divisor we want.
  let left = 1;
  let right = Math.max(...nums);
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const divisor = mid;
    const value = sum(nums, divisor);

    // If the value is too large, our divisor was too small, so we should shift our left value to be mid + 1.
    if (value > threshold) {
      left = mid + 1;
    }
    // Otherwise, we should shift our right value to mid.
    else {
      right = mid;
    }
  }

  // Found the divisor at the "insertion point".
  return left;
}
