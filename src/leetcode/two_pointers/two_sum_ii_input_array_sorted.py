# DIFFICULTY: MEDIUM
# ------------------
#
# Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such
# that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where
# 1 <= index1 < index2 <= numbers.length.
#
# Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of
# length 2.
#
# The tests are generated such that there is exactly one solution. You may not use the same element twice.
#
# Your solution must use only constant extra space.
#
# See https://leetcode.com/problems/two-sum-ii-input-array-is-sorted
class Solution:
    def twoSum(self, numbers: list[int], target: int) -> list[int]:
        """
        SOLUTION
        --------

        Use the two pointer approach to narrow in on the target sum from both the left and the right.

        COMPLEXITY
        ----------

        Time complexity is O(n) where n is the number of elements in the array.

        Space complexity is O(1).
        """
        left = 0
        right = len(numbers) - 1

        while left < right:
            sum = numbers[left] + numbers[right]
            if sum == target:
                return [left + 1, right + 1]

            if sum < target:
                left += 1

            if sum > target:
                right -= 1

        return []
