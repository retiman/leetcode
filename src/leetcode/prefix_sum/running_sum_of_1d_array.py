# DIFFICULTY: EASY
# ----------------
#
# Given an array nums. We define a running sum of an array as runningSum[i] = sum(nums[0]…nums[i]).
#
# Return the running sum of nums.
#
# See https://leetcode.com/problems/running-sum-of-1d-array
from itertools import accumulate


class Solution:
    """
    SOLUTION
    --------

    This is known as a prefix sum.

    See https://en.wikipedia.org/wiki/Prefix_sum

    COMPLEXITY
    ----------

    Time complexity is O(n) because we are iterating through the list once.

    Space complexity is O(n) because we are storing the prefix sum array.
    """

    def runningSum(self, nums: list[int]) -> list[int]:
        return list(accumulate(nums))
