# DIFFICULTY: MEDIUM
# ------------------
#
# Design a hit counter which counts the number of hits received in the past 5 minutes (i.e., the past 300 seconds).
#
# Your system should accept a timestamp parameter (in seconds granularity), and you may assume that calls are being
# made to the system in chronological order (i.e., timestamp is monotonically increasing). Several hits may arrive
# roughly at the same time.
#
# See https://leetcode.com/problems/design-hit-counter
class HitCounter:
    def __init__(self) -> None:
        """
        SOLUTION
        --------

        To do this efficiently we'll have to use a circular array buffer.  This is the same technique used by time
        series databases.

        COMPLEXITY
        ----------

        Time complexity is O(1) for both methods since we fix the array size at 300.

        Space complexity is O(1) for both methods because we fix the array size at 300.
        """
        # Each event is a [timestamp, hit_count].  Since our granularity is in seconds, we only need to track the last
        # 300 seconds.
        self.timestamps = [0 for _ in range(300)]
        self.hits = [0 for _ in range(300)]

    def hit(self, timestamp: int) -> None:
        # Find the index of the event in our circular buffer that would correspond to this timestamp.
        i = timestamp % 300

        # If we've already recorded this timestamp, increment it.
        if self.timestamps[i] == timestamp:
            self.hits[i] += 1
        # If we haven't, set the hits to 1.
        else:
            self.timestamps[i] = timestamp
            self.hits[i] = 1

    def getHits(self, timestamp: int) -> int:
        count = 0

        for i, t in enumerate(self.timestamps):
            if timestamp - t < 300:
                count += self.hits[i]

        return count
