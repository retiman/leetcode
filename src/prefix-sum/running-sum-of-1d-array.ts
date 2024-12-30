// Given an array nums. We define a running sum of an array as runningSum[i] = sum(nums[0]…nums[i]).
//
// Return the running sum of nums.
//
// See {@link https://leetcode.com/problems/running-sum-of-1d-array/description/}
export { runningSum };

// SOLUTION:
//
// This is known as a prefix sum.
//
// See {@link https://en.wikipedia.org/wiki/Prefix_sum}
function runningSum(nums: number[]): number[] {
  if (nums.length <= 1) {
    return nums;
  }

  const result = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    result[i] = result[i - 1] + nums[i];
  }
  return result;
}
