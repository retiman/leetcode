// DIFFICULTY: Medium
//
// We have an array of integers, nums, and an array of requests where requests[i] = [starti, endi]. The ith request asks
// for the sum of nums[starti] + nums[starti + 1] + ... + nums[endi - 1] + nums[endi]. Both starti and endi are
// 0-indexed.
//
// Return the maximum total sum of all requests among all permutations of nums.
//
// Since the answer may be too large, return it modulo 109 + 7.
//
// See https://leetcode.com/problems/maximum-sum-obtained-of-any-permutation/
describe('maximum sum obtained of any permutation', () => {
  // This question is asking for a very weird thing.
  //
  // Here, the request ranges don't change; they want to sum the values of the range.  However, the nums array can be
  // in any order you want.  The ask is to find the order of nums that gives you the maximum sum across ALL requests,
  // and then return that maximum sum (not the specific order).
  //
  // This will happen if the most frequently asked for numbers are matched up with the largest numbers.  So basically,
  // sort the nums in descending order by frequency.
  function maxSumRangeQuery(nums: number[], requests: number[][]): number {
    // First, calculate for each index i, how many times that index is requested.
    const freq: number[] = [];
    for (const request of requests) {

    }
  }

  test('maximum sum obtained of any permutation - test case 1', async () => {
    expect(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6);
  });
});
/*
function maxSumRangeQuery(nums: number[], requests: number[][]): number {
    const MOD = 1_000_000_007;
    const n = nums.length;
    const freq = new Array(n).fill(0);

    // Step 1: Calculate the frequency of each index in nums being requested
    for (const [start, end] of requests) {
        freq[start]++;
        if (end + 1 < n) {
            freq[end + 1]--;
        }
    }

    // Step 2: Calculate the actual frequency of each index by taking the prefix sum
    for (let i = 1; i < n; i++) {
        freq[i] += freq[i - 1];
    }

    // Step 3: Sort the nums array and the freq array in descending order
    nums.sort((a, b) => b - a);
    freq.sort((a, b) => b - a);

    // Step 4: Calculate the maximum sum using the sorted arrays
    let maxSum = 0;
    for (let i = 0; i < n; i++) {
        maxSum = (maxSum + nums[i] * freq[i]) % MOD;
    }

    return maxSum;
}
*/