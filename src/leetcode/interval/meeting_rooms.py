# DIFFICULTY: EASY
# ----------------
#
# Given an array of meeting time intervals where intervals[i] = [starti, endi], determine if a person could attend all
# meetings.
#
# See https://leetcode.com/problems/meeting-rooms
class Solution:
    def canAttendMeetings(self, intervals: list[list[int]]) -> bool:
        """
        SOLUTION
        --------

        This is a very straightforward problem.  We just need to sort the intervals by start time (and end time as a tie
        breaker), then check if there is any overlap.

        COMPLEXITY
        ----------

        Time complexity is O(n log n) since we have to sort the intervals.

        Space complexity is O(1) since we don't use any extra space.
        """
        # No overlapping intervals are possible if 0 or 1 meetings.
        if len(intervals) <= 1:
            return True

        # Sorts by start time, then end time as a tie breaker.
        intervals.sort(key=lambda x: (x[0], x[1]))

        for i in range(1, len(intervals)):
            previous = intervals[i - 1]
            current = intervals[i]
            # Overlaps  exist if the previous end > current start.
            if previous[1] > current[0]:
                return False

        return True
