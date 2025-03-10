# DIFFICULTY: MEDIUM
#
# Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any
# order.
#
# See https://leetcode.com/problems/top-k-frequent-elements
from collections import defaultdict


class Solution:
    def topKFrequent(self, xs: list[int], k: int) -> list[int]:
        """
        SOLUTION:

        Just map each number to its frequency then sort by frequency.  Return the first k elements.

        COMPLEXITY:

        Time complexity dominated by the sort, which is O(n log n).

        Space complexity is O(n) because we are using a map to store frequency.
        """
        # Create a map of number -> frequency.
        map: dict[int, int] = defaultdict(int)

        # Now populate the map by mapping each number to its frequency.
        for x in xs:
            map[x] += 1

        # Now get all the unique elements from the list.
        uniques = list(map.keys())

        # Sort the unique values by their frequency.  Since we want the most frequent elements, we sort in decreasing
        # order (aka reverse order).
        uniques = sorted(map.keys(), key=lambda x: map[x], reverse=True)

        # Return the first k elements
        return uniques[:k]
