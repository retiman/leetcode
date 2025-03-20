class Solution:
    def minAvailableDuration(self, slots1: list[list[int]], slots2: list[list[int]], duration: int) -> list[int]:
        """
        SOLUTION
        --------

        To solve this, sort the intervals and use the two pointer technique to find a time slot that works for
        everybody.

        COMPLEXITY
        ----------

        Time complexity is O(n log n) where n is the number of slots.

        Space complexity is O(1).
        """
        # Sort by start time, then end time as a tie breaker.
        slots1.sort(key=lambda x: (x[0], x[1]))
        slots2.sort(key=lambda x: (x[0], x[1]))

        i = 0
        j = 0
        while i < len(slots1) and j < len(slots2):
            a = slots1[i]
            b = slots2[j]

            # The start time is the max of the two individuals start times; we can't start before the other person is
            # ready.  The end time is the min of the two individuals end times; we can't end later than the other
            # person's hard stop.
            start = max(a[0], b[0])
            end = min(a[1], b[1])

            # If we can accomodate the availability we should return the start time plus the duration; we shouldn't keep the
            # meeting longer than it needs to be.
            if end - start >= duration:
                return [start, start + duration]

            # Otherwise, we should move the pointer for the person who has the earlier ending time; these times
            # represent availability, so if an earlier availability doesn't match the other person's later availability,
            # we shouldn't keep the meeting longer than it needs to be.
            if a[1] < b[1]:
                i += 1
            else:
                j += 1

        return []
