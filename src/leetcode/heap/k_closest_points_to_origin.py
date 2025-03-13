# DIFFICULTY: MEDIUM
#
# Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the
# k closest points to the origin (0, 0).
#
# The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).
#
# You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).
#
# See https://leetcode.com/problems/k-closest-points-to-origin
from heapq import heappop, heappush
import math


class Solution:
    def kClosest(self, points: list[list[int]], k: int) -> list[list[int]]:
        """
        SOLUTION
        --------

        The request for "k-closest" indicates you'll want a heap.  Using a either a min heap or max heap will work.

        With a min heap, just jam all the points on the heap and then slice the first k elements.  This requires storing
        all the points on the heap.

        With a max heap, you can jam points on the heap until you have k elements.  Then, when you have a new point,
        compare it to the max element on the heap.  If it's closer, pop off the max element and jam it on the heap;
        otherwise, ignore it.

        The max heap approach can be more efficient, so we'll go that route.

        COMPLEXITY
        ----------

        Time complexity is O(n log k) with a max heap, which will be faster when k is much smaller than n.  If we go
        with the min heap approach, it's O(n log n).

        Space complexity is O(n).
        """

        # Calculates the distance to the origin.  Technically, since we're only using the distance to do comparison, we
        # don't need to take the square root since they are all going to compare the same square root or not.  I'm
        # leaving it here for correctness.
        def distance(p: list[int]) -> float:
            [x, y] = p
            return math.sqrt(x**2 + y**2)

        # Store max heap of (distance, point).  LeetCode gives us the points as list of [x, y].
        max_heap: list[tuple[float, list[int]]] = []
        for p in points:
            # Simulate a max heap by negating the distance.  When storing a tuple in the heap, Python will sort by tuple
            # ordering, so will first sort by the first element, then the second.  Sorting by the first element
            # (distance) is all we need.
            d = distance(p)
            heappush(max_heap, (-d, p))

            # If we have more than k elements, remove the farthest point.
            if len(max_heap) > k:
                heappop(max_heap)

        # Return the k closest points, throwing away the distance.
        return [p for _, p in max_heap]
