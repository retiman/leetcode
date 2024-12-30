// DIFFICULTY: Medium
//
// You are given a 0-indexed array of positive integers w where w[i] describes the weight of the ith index.
//
// You need to implement the function pickIndex(), which randomly picks an index in the range [0, w.length - 1]
// (inclusive) and returns it. The probability of picking an index i is w[i] / sum(w).
//
// For example, if w = [1, 3], the probability of picking index 0 is 1 / (1 + 3) = 0.25 (i.e., 25%), and the
// probability of picking index 1 is 3 / (1 + 3) = 0.75 (i.e., 75%).
//
// See {@link https://leetcode.com/problems/random-pick-with-weight/}
export { Solution };

// SOLUTION:
//
// The naive way to do this is to take the weights and create a new array that's the size of the sum of the weights.
// For example, if you have the input [1, 3], create an array [0, 1, 1, 1].  Then, generate a random number between
// 0 and 3 to implement pickIndex().
//
// This will work, but once you have a large number of weights, you'll be creating quite large arrays.
//
// Instead, we can compute a prefix sum to avoid expanding an array.  For example, suppose you had the weights
// [1, 3, 2].  The prefix sum array would be [1, 4, 6].  To pick an index, generate a random number between 0 and 6,
// then use binary search to find the index that correpsonds to the random number.
class Solution {
  private readonly prefixSum: number[];
  private total: number;

  constructor(w: number[]) {
    this.prefixSum = [];
    this.total = 0;

    for (let i = 0; i < w.length; i++) {
      this.total += w[i];
      this.prefixSum[i] = this.total;
    }
  }

  pickIndex(): number {
    // Pick a random number between 0 and the total.  Doesn't have to be an integer.
    const target = Math.random() * this.total;

    // Use binary search to find the index that corresponds to the random number.
    let left = 0;
    let right = this.prefixSum.length - 1;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (this.prefixSum[mid] < target) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return left;
  }
}
