# DIFFICULTY: EASY
# ----------------
#
# Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.
#
# Implement the MovingAverage class:
#
# - MovingAverage(int size) Initializes the object with the size of the window size.
# - double next(int val) Returns the moving average of the last size values of the stream.
#
# See https://leetcode.com/problems/moving-average-from-data-stream
from collections import deque


class MovingAverage:
    """
    SOLUTION
    --------

    This can be solved with a queue or sliding window.

    COMPLEXITY
    ----------

    Time complexity is O(1) for next.

    Space complexity is O(n) where n is the size of the window.
    """

    def __init__(self, size: int) -> None:
        self.size = size
        self.window: deque[int] = deque()
        self.total = 0

    def next(self, val: int) -> float:
        if len(self.window) == self.size:
            self.total -= self.window.popleft()

        self.window.append(val)
        self.total += val
        return self.total / len(self.window)
