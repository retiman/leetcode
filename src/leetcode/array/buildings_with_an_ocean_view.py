# DIFFICULTY: MEDIUM
#
# There are n buildings in a line. You are given an integer array heights of size n that represents the heights of the
# buildings in the line.
#
# The ocean is to the right of the buildings. A building has an ocean view if the building can see the ocean without
# obstructions. Formally, a building has an ocean view if all the buildings to its right have a smaller height.
#
# Return a list of indices (0-indexed) of buildings that have an ocean view, sorted in increasing order.
#
# See https://leetcode.com/problems/buildings-with-an-ocean-view
class Solution:
    def findBuildings(self, heights: list[int]) -> list[int]:
        """
        SOLUTION
        --------

        This is easier to do iterating from right to left (since the ocean is to the right).  We can keep track of the
        tallest building we've seen so far, and if we encounter a building that is taller, we can add it to the list
        with ocean views.

        COMPLEXITY
        ----------

        Time complexity is O(n) because we are iterating through the list of buildings once, and reversing once.

        Space complexity is O(n) because we are storing a result array.
        """
        result: list[int] = []
        tallest = float("-inf")

        for i in reversed(range(len(heights))):
            height = heights[i]
            if height > tallest:
                tallest = height
                result.append(i)

        # Because we want the buildings in increasing order and we iterated in reverse, reverse the result list.  We
        # could have used a deque, but converting the deque to a list will be O(n) anyways.
        return result[::-1]
