# DIFFICULTY: HARD
#
# Given an integer array nums, return the number of all the arithmetic subsequences of nums.
#
# A sequence of numbers is called arithmetic if it consists of at least three elements and if the difference between
# any two consecutive elements is the same.
#
# - For example, [1, 3, 5, 7, 9], [7, 7, 7, 7], and [3, -1, -5, -9] are arithmetic sequences.
# - For example, [1, 1, 2, 5, 7] is not an arithmetic sequence.
#
# A subsequence of an array is a sequence that can be formed by removing some elements (possibly none) of the array.
#
# - For example, [2,5,10] is a subsequence of [1,2,1,2,4,1,5,10].
#
# The test cases are generated so that the answer fits in 32-bit integer.
#
# See https://leetcode.com/problems/arithmetic-slices-ii-subsequence
from collections import defaultdict


class Solution:
    def numberOfArithmeticSlices(self, xs: list[int]) -> int:
        """
        SOLUTION:

        To solve this we can use a dynamic programming approach to build up the number of subsequences at each index,
        for each subsequence difference.

        Note that we can have [2, 4, 6, 8], and there are subsequences [2, 4, 6, 8] (the entire array) and [2, 4, 6],
        which is part of the array.  Also note that [7, 7, 7, 7] has a total of 16 subsequences because every
        subsequence is arithmetic (they can overlap).
        """
        if len(xs) < 3:
            # An arithmetic subsequence must have at least length 3, so if we have fewer, then there are no
            # subsequences.
            return 0

        result = 0

        # A list of dictionaries keeping track of subsequences ending at index i.  The keys in the dictionary represent
        # the differences in the arithmetic subsequence, and the values represent the count with that difference.
        #
        # Each dict is a map of difference -> count.
        subsequences: list[dict[int, int]] = []
        for i in range(len(xs)):
            subsequences.append(defaultdict(int))

        # Since we are considering pairs of elements, start at 1 to ensure that there is at least another element before
        # it.
        for i in range(len(xs)):
            # At each index j, every number at index i (prior to j) could be participating in a subsequence where the
            # difference of the arithmetic subsequence is xs[j] - xs[i].  So for each j, examine every previous element
            # at i to see if it contributes to some subsequence.
            for j in range(i):
                # Calculate the difference between the two numbers, and note that the difference can be negative (and
                # the numbers in the array can be negative as well).  This means the subsequence can be increasing or
                # decreasing; it does not matter.
                #
                # That is, we want to find and extend any arithmetic subsequences that xs[j] might be a part of with the
                # difference of of xs[i] - xs[j].
                difference = xs[i] - xs[j]

                # Get count of existing subsequences at j with difference (xs[j - 1] === xs[j] - difference is true).
                # We can extend these subsequences by adding xs[i].
                cj = subsequences[j][difference]

                # Get count of existing subsequences at i with difference (xs[i - 1] === xs[i] - difference is true).
                ci = subsequences[i][difference]

                # Update the count of subsequences at j, which is the previous count at i, plus the previous count at j,
                # and then 1 more to account for adding j to the subsequence (by going from xs[i] to xs[j]).
                subsequences[i][difference] = ci + cj + 1

                # Add to the running total, excluding the pair (xs[i], xs[j]).  If we just have this pair, it will NOT
                # contribute to a 3 element arithmetic subsequence (because there are only 2 elements).
                result += cj

        return result
