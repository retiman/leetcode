# DIFFICULTY: MEDIUM
# ------------------
#
# Given an integer array nums of unique elements, return all possible subsets  (the power set).
#
# The solution set must not contain duplicate subsets. Return the solution in any order.
#
# See https://leetcode.com/problems/subsets
class Solution:
    def subsets(self, nums: list[int]) -> list[list[int]]:
        """
        SOLUTION
        --------
        To do this, recursively generate all combinations of elements of the set `xs - x`, then take all the subsets
        created and add x to them.  This should result in 2^n number of subsets.

        COMPLEXITY
        ----------
        Time complexity is O(2^n) where n is the number of elements in the list.

        Space complexity is O(n) because we are storing the subsets in stack frames.
        """

        def generate(xs: set[int]) -> set[set[int]]:
            if len(xs) == 0:
                return set(set())

            # Find the first element of xs and call it x; remove it from the set.
            x = xs.pop()

            # Make a copy of xs without x and generate all subsets of that set.
            rest = set(xs)
            excludeds = generate(rest)

            # Now generate all subsets with x by adding x to each excluded subset.
            includeds: set[set[int]] = set()
            for excluded in excludeds:
                included = set(excluded)
                included.add(x)
                includeds.add(included)

            # Combine the excluded and included subsets.
            return set.union(excludeds, includeds)

        result = generate(set(nums))
        return [list(subset) for subset in result]
