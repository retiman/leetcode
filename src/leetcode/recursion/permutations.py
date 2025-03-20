# DIFFICULTY: MEDIUM
# ------------------
#
# Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.
#
# See https://leetcode.com/problems/permutations
class Solution:
    def permute(self, nums: list[int]) -> list[list[int]]:
        """
        SOLUTION
        --------

        To do this, recursively generate all permutations of elements without the head.  Then take all permutations
        created and add x to the front of the list.  This should result in n! number of arrays.

        The general strategy is to split the list into a head and a tail.  Generate all the permutations of the list
        without the head element, then put the head in front of each of the generated permutations.  Do this recursively
        for each element in the list will give all permutations.

        COMPLEXITY
        ----------

        Time complexity is O(n!) where n is the number of elements in the list.

        Space complexity is O(n) because we are storing the permutations in stack frames.
        """
        if not nums:
            return []

        if len(nums) == 1:
            return [nums]

        result: list[list[int]] = []
        for i, x in enumerate(nums):
            # Generate all permutations of the list without x.
            without = nums[:i] + nums[i + 1 :]
            ps = self.permute(without)

            # For each of the permutations, put the ith element in front of the permutations.
            for p in ps:
                result.append([x] + p)

        return result
