// DIFFICULTY: MEDIUM
//
// Given an integer array nums, return the length of the longest strictly increasing subsequence.
//
// @see {@link https://leetcode.com/problems/longest-increasing-subsequence/}

// SOLUTION:
//
// The naive way is to do this with dynamic programming and two nested loops.
//
// The more efficient way is to do binary search after constructing a "tails" array.  The tails array represents the
// smallest possible ending element for a subsequence of length i + 1.  For example, if tails is [2, 3, 7], that means:
//
// - There is a length 1 subsequence ending in 2.
// - There is a length 2 subsequence ending in 3.
// - There is a length 3 subsequence ending in 7.
//
// As we iterate through the array, we will keep the tails array updated.  At the end of iteration, the length of the
// tails array will tell us the longest increasing subsequence.
//
// COMPLEXITY:
//
// Time complexity is O(n log n) because we are doing a binary search for each element in the array.  Space complexity
// is O(n) because we are using an array to store the tails.
function lengthOfLIS(nums: number[]): number {
  const tails: number[] = [];

  for (const num of nums) {
    // Now we do a binary search to figure out where to insert num into tails.
    let left = 0;
    let right = tails.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < num) {
        // Move to the right if num is larger.
        left = mid + 1;
      } else {
        // Move to the left if num is smaller.
        right = mid;
      }
    }

    // We found an index in tails; this number is the smallest possible ending element for a subsequence of length left.
    // So update that value in tails.
    if (left < tails.length) {
      tails[left] = num;
    }
    // Otherwise left === tails.length, which means we are adding a new element to the end of tails.  This number is the
    // smallest possible ending element for a subsequence of length left + 1.
    else {
      tails.push(num);
    }
  }

  // The length of tails is the length of the longest increasing subsequence.
  return tails.length;
};