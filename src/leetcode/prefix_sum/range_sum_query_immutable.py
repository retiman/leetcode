# DIFFICULTY: EASY
# ----------------
#
# Given an integer array nums, handle multiple queries of the following type:
#
# Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.
# Implement the NumArray class:
#
# - NumArray(int[] nums) Initializes the object with the integer array nums.
# - int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive
#   (i.e. nums[left] + nums[left + 1] + ... + nums[right]).
#
# See https://leetcode.com/problems/range-sum-query-immutable
from itertools import accumulate


class NumArray:
    """
    SOLUTION
    --------

    This can be done with a prefix sum array.

    COMPLEXITY
    ----------

    Time complexity is O(n) because we are iterating through the list once.

    Space complexity is O(n) because we are storing the prefix sum array.
    """

    def __init__(self, nums: list[int]) -> None:
        self.prefix_sum = list(accumulate(nums))

    def sumRange(self, left: int, right: int) -> int:
        # This is the sum of the elements from 0 to right, inclusive.
        rvalue = self.prefix_sum[right]

        # We'll want to subtract out the sum of elements from 0 to left, excluding the left element.  This means we
        # should calculate the sum from 0 to left - 1, giving us prefixSum[left - 1].
        #
        # If the left index is 0, then we don't need to subtract anything, so the value is 0.
        lvalue = self.prefix_sum[left - 1] if left > 0 else 0

        return rvalue - lvalue
