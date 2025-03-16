# DIFFICULTY: HARD
# ----------------
#
# You are given an array nums of n positive integers.
#
# You can perform two types of operations on any element of the array any number of times:
#
# If the element is even, divide it by 2.
#
# For example, if the array is [1,2,3,4], then you can do this operation on the last element, and the array will be
# [1,2,3,2].
#
# If the element is odd, multiply it by 2.
#
# For example, if the array is [1,2,3,4], then you can do this operation on the first element, and the array will be
# [2,2,3,4].
#
# The deviation of the array is the maximum difference between any two elements in the array.
#
# Return the minimum deviation the array can have after performing some number of operations.
#
# See https://leetcode.com/problems/minimize-deviation-in-array
import heapq as hq
import math


def heappush(max_heap: list[int], item: int) -> None:
    # Simulate a max heap by negating the value.
    hq.heappush(max_heap, -item)


def heappop(max_heap: list[int]) -> int:
    return -hq.heappop(max_heap)


class Solution:
    def minimumDeviation(self, nums: list[int]):
        """
        SOLUTION
        --------

        To solve this problem, we have to multiply elements to make them bigger, or divide elements to make them
        smaller. We continue to do this until the minimum and maximum elements are as close as possible.

        To make this problem easier, we try to minimize the deviation by making bigger numbers smaller, instead of
        simultaneously trying to make numbers bigger and smaller.  To do this, we multiply all odd numbers by 2, so that
        they all become even.  Afterwards, we can choose to perform a division or not to make it smaller.

        COMPLEXITY
        ----------

        Time complexity is O(n log m) where n is the number of elements in nums, and m is the number of times we have to
        halve a value.

        Space complexity is O(n).
        """
        max_heap: list[int] = []

        # Normalize all the numbers so that they are even.  Now we can consider only division as a way to make numbers
        # smaller and closer to each other.  If a previously odd number was too big, we will eventually resize it smaller
        # by division is necessary.
        for i, value in enumerate(nums):
            if value % 2 == 1:
                value *= 2
                nums[i] = value

            heappush(max_heap, value)

        minimum = min(nums)
        deviation = math.inf

        # Calculate the current deviation using the max element of the array, then half the max element and return it to
        # theheap.  Then repeat to keep bringing the deviation down.
        while True:
            maximum = heappop(max_heap)
            deviation = min(deviation, maximum - minimum)

            # Oh no!  If the max value was odd, we can't halve it and re-insert into the heap.  This means that whatever
            # the deviation is now, we are stuck.  Halving smaller even values will not change the deviation.
            if maximum % 2 == 1:
                break

            # Halve the max value and return it to the heap for re-processing.
            value = int(maximum / 2)
            heappush(max_heap, value)

            # Update the minimum value in case we've changed the minimum value by manipulating the maximum value.
            minimum = min(value, minimum)

        return int(deviation)
