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

        # Note that you cannot put a set inside of a set; sets are mutable and cannot be hashed.  However, frozensets
        # are immutable, so you can use those instead.
        def generate(xs: set[int]) -> set[frozenset[int]]:
            if not xs:
                # Note that set(frozenset()) creates an empty set, not a set with an empty set in it.
                return {frozenset()}

            # Find the first element of xs and call it x; remove it from the set and call it rest.
            ys = list(xs)
            x = ys[0]
            rest = set(ys[1:])

            # Generate all subsets of that set.
            excludeds = generate(rest)

            # Now generate all subsets with x by adding x to each excluded subset.
            includeds = {subset | {x} for subset in excludeds}

            # Combine the excluded and included subsets.
            return excludeds | includeds

        result = generate(set(nums))
        return [list(subset) for subset in result]
