# DIFFICULTY: Medium
#
# You are given an integer array heights representing the heights of buildings, some bricks, and some ladders.
#
# You start your journey from building 0 and move to the next building by possibly using bricks or ladders.
#
# While moving from building i to building i+1 (0-indexed),
#
# - If the current building's height is greater than or equal to the next building's height, you do not need a ladder
#   or bricks.
# - If the current building's height is less than the next building's height, you can either use one ladder or
#   (h[i+1] - h[i]) bricks.
#
# Return the furthest building index (0-indexed) you can reach if you use the given ladders and bricks optimally.
#
# See https://leetcode.com/problems/furthest-building-you-can-reach
from heapq import heappop, heappush


class Solution:
    def furthestBuilding(self, heights: list[int], bricks: int, ladders: int) -> int:
        """
        SOLUTION:

        You can't do this problem using sliding window or two pointer technique easily.

        Sliding window requires finding some value in a fixed size window.  Here we don't know what the window size will
        be.

        Two pointer technique can solve this problem but not optimally.  We need to dynamically adjust our resources of
        bricks or ladder at each step.

        A greedy algorithm would be better suited to solve this problem.

        COMPLEXITY:

        Time complexity is O(n log n) time where n is number of buildings.

        Space complexity is O(n) in worst case.
        """
        heap: list[int] = []

        for i in range(len(heights) - 1):
            # Calculate the delta that we need to "jump" across.
            delta = heights[i + 1] - heights[i]

            # A negative or zero height jump can be traversed by jumping across or down.
            if delta <= 0:
                continue

            # A non-negative delta means we must use either bricks or a ladder to jump across.
            heappush(heap, delta)

            # Because the ladders can traverse any height, we'll "save" the ladders here to use on the the biggest
            # deltas.  As long as we have ladders remaining we can maintain a heap size of deltas that we'll
            # eventually use ladders on.
            if len(heap) <= ladders:
                continue

            # If we have more elements on the heap than we do ladders, then SOME of these deltas need to be traversed
            # using bricks instead of ladders.  Let's pop the smallest delta out and use bricks on it.
            smallest = heappop(heap)
            bricks -= smallest

            # If we've run out of bricks, that's it.  We can can only reach the building at position i.
            if bricks < 0:
                return i

        # If we got here, that means we can get to the very last building!
        return len(heights) - 1
