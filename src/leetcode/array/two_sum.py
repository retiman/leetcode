# DIFFICULTY: EASY
#
# Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to
# target.
#
# You may assume that each input would have exactly one solution, and you may not use the same element twice.
#
# You can return the answer in any order.
#
# See https://leetcode.com/problems/two-sum
class Solution:
    def twoSum(self, xs: list[int], target: int) -> list[int]:
        """
        SOLUTION:

        Use a hashmap to keep track of values we've already seen.  This lets us avoid the O(n^2) solution of checking every
        possible pair of values.

        When iterating, you can check if the complement nums[j] = target - nums[i] already exists in the hashmap.  If it
        does then we've found the solution and can return the indices immediately.

        COMPLEXITY:

        Time complexity is O(n).

        Space complexity is O(n).
        """
        # Map number complement -> index where it appears.
        map: dict[int, int] = {}

        for i, x in enumerate(xs):
            complement = target - x

            # If our map has the complementary value that would make up the target, we can return it immediately.
            if complement in map:
                return [i, map[complement]]

            # Otherwise, store the number and its index in the map.  If we find the complement later, then this index
            # will be the complement's complement and we can return the indices as normal.
            map[x] = i

        return []
