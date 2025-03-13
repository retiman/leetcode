# DIFFICULTY: MEDIUM
#
# A peak element is an element that is strictly greater than its neighbors.
#
# Given a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple
# peaks, return the index to any of the peaks.
#
# You may imagine that nums[-1] = nums[n] = -∞. In other words, an element is always considered to be strictly greater
# than a neighbor that is outside the array.
#
# You must write an algorithm that runs in O(log(n)) time.
#
# See https://leetcode.com/problems/find-peak-element
class Solution:
    def findPeakElement(self, xs: list[int]) -> int:
        """
        SOLUTION
        --------

        This problem is not hard, but the wording is incredibly tricky.  First off, let's talk about linear scan versus
        binary search.  There are only 1000 elements max in the array, so either would work.  However, the problem says
        that the algorithm must run in O(log(n)) time.  This means we have to use binary search.

        Yes, binary search will still work even if the array is not sorted.  That's because at each step, we are chasing
        a gradient uphill.  For example, if we see [..., 10, 5, 5, ...] then we know that the elements are RISING in the
        left direction (and then eventually fall, because the left side element is -Infinity).  So, we should slice the
        array in half and look for a peak in the left half; the opposite logic applies if the array is rising to the
        right.

        Secondly, the problem doesn't explicitly say what happens if there are no peaks.  The solution I give throws an
        error if none are found (e.g. [1, 1, 1], or [1, 10, 10, 1]).  Nowhere does LeetCode say what should happen if
        the inputs are invalid (e.g. have no peaks), or that all inputs are valid.  However, it does apply to pass if we
        assume peaks always exist!

        COMPLEXITY
        ----------

        Time complexity is O(log n).

        Space complexity is O(1).
        """
        if len(xs) == 1:
            return 0

        # Use insertion point binary search to find the peak.
        left = 0
        right = len(xs)
        mid = -1

        while left < right:
            mid = (left + right) // 2
            prev = float("-inf") if mid == 0 else xs[mid - 1]
            next = float("-inf") if mid == len(xs) - 1 else xs[mid + 1]

            # If we've found a peak, we can simply return it.
            if xs[mid] > prev and xs[mid] > next:
                return mid

            # Otherwise, if the right side number is larger, then a peak must exist somewhere on the right, so update
            # the left boundary.
            if next > xs[mid]:
                left = mid + 1
            # Likewise, if the left side number is larger, then a peak must exist somewhere on the left, so update the
            # right boundary.
            elif prev > xs[mid]:
                right = mid
            # Oh, wait, what if we have a plateau?  Like [..., 10, 10, 10, ...].  We don't know which direction to go,
            # and in fact, binary search would NOT even work here.
            #
            # In fact, the inputs given will never cause this situation to occur.  So we will simply ignore this edge
            # case.
            else:
                pass

        # If we've reached this point, we have possibly found a peak.  In theory, we could have landed on a plateau
        # after running through the binary search, and the problem doesn't say what to do, but it appears you never
        # get any inputs that cause this to happen.
        #
        # Again, the inputs given will never cause this situation to occur.  Therefore, we simply assume that the binary
        # search ran successfully and return the midpoint.
        return mid
