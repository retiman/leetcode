# DIFFICULTY: MEDIUM
#
# Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array
# of the non-overlapping intervals that cover all the intervals in the input.
#
# See https://leetcode.com/problems/merge-intervals
class Solution:
    def merge(self, intervals: list[list[int]]) -> list[list[int]]:
        """
        SOLUTION
        --------

        Sort the intervals by start time, then merge overlapping intervals.

        COMPLEXITY
        ----------

        Time complexity is O(n log n) since we have to sort the intervals.

        Space complexity is O(n) since we have to store the merged intervals.
        """
        # Sort by start time, then end time as a tie breaker.
        intervals.sort(key=lambda x: (x[0], x[1]))

        merged: list[list[int]] = []
        for interval in intervals:
            if len(merged) == 0:
                merged.append(interval)
                continue

            a = merged[-1]
            b = interval

            # If the intervals are disjoint, then a[1] is going to be strictly less than b[0].  In which case, there is
            # no overlap, and we just append the interval to the merged list.
            #
            # Note that we can make this assumption because the intervals are sorted.
            if a[1] < b[0]:
                merged.append(b)
            # Otherwise, there is overlap, and we need to merge the intervals.
            else:
                # Because the intervals are sorted (a <= b), a[0] is always going to be smaller or the same as b[0].
                merged[-1] = [a[0], max(a[1], b[1])]

        return merged
