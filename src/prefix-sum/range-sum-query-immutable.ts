// DIFFICULTY: Easy
//
// Given an integer array nums, handle multiple queries of the following type:
//
// Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.
// Implement the NumArray class:
//
// - NumArray(int[] nums) Initializes the object with the integer array nums.
// - int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive
//   (i.e. nums[left] + nums[left + 1] + ... + nums[right]).
export { NumArray };

// SOLUTION:
//
// Implement a prefix sum array for efficient range queries.
class NumArray {
  private readonly prefixSum: number[];

  constructor(nums: number[]) {
    this.prefixSum = [];

    for (let i = 0; i < nums.length; i++) {
      if (i === 0) {
        this.prefixSum[0] = nums[0];
        continue;
      }

      this.prefixSum[i] = this.prefixSum[i - 1] + nums[i];
    }
  }

  sumRange(left: number, right: number): number {
    // This is the sum of the elements from 0 to right, inclusive.
    const rvalue = this.prefixSum[right];

    // We'll want to subtract out the sum of elements from 0 to left, excluding the left element.  This means we should
    // calculate the sum from 0 to left - 1, giving us prefixSum[left - 1].
    //
    // If the left index is 0, then we don't need to subtract anything, so the value is 0.
    const lvalue = left > 0 ? this.prefixSum[left - 1] : 0;

    return rvalue - lvalue;
  }
}
