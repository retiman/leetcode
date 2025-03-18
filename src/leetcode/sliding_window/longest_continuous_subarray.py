# DIFFICULTY: MEDIUM
# ------------------
#
# Given an array of integers nums and an integer limit, return the size of the longest non-empty subarray such that the
# absolute difference between any two elements of this subarray is less than or equal to limit.
#
# See https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit
from collections import deque


class Solution:
    def longestSubarray(self, nums: list[int], limit: int) -> int:
        """
        SOLUTION
        --------

        Use a sliding window approach to find the max length subarray.  We'll have to keep track of what the min/max
        elements in the subarray while adjusting our window size.  To do so we'll use two deques.

        We'll have a right pointer that moves forward through the array as normal.  The left pointer will move forward
        through the array only when the subarray constraint (under limit) is violated.  As the pointers move, we'll need
        to keep track of the smallest and largest elements; that's what the deques are for.

        We can't simply store the max element or min element by itself; as the pointers move, these elements will
        change.  Instead, we'll have to use our deques to maintain the max/min elements at every window size.  The
        `minDeque` will have elements in increasing order, and the `maxDeque` will have elements in decreasing order.
        We keep the deques organized like this so that the largest element will always be at the front of the
        `maxDeque`, and the smallest element will always be at the front of the `minDeque`.

        As we advance the right pointer, we'll have to pop off elements at the back of the deque and then push the right
        pointer onto the end of the deque, while maintaining the ascending/descending order.  As we advance the left
        pointer, we'll shift off the element at the front of the deque if it is less than what we just passed.

        COMPLEXITY
        ----------
        Time complexity is O(n) where n is the number of elements in the list.

        Space complexity is O(n) because we are storing the maximum and minimum elements in the window.
        """
        # Keeps track of indices whose values are in descending order.  This will allow us to quickly find the index of
        # the largest element as the window shifts.
        max_deque: deque[int] = deque()

        # Keeps track of indices whose values are in ascending order.  This will allow us to quickly find the index of
        # the smallest element as the window shifts.
        min_deque: deque[int] = deque()

        # The current max length of a continuous subarray.
        result = 0

        # Expand the right window while updating our deques.  Each element we encounter from the right side will be used
        # to update our deques.
        left = 0
        for right in range(len(nums)):
            value = nums[right]

            # Update the max deque by removing all elements at the end of the deque that are smaller, so we can maintain
            # a deque in descending order.
            while max_deque and nums[max_deque[-1]] <= value:
                max_deque.pop()
            max_deque.append(right)

            # Update the min deque by removing all elements at the end of the deque that are bigger, so we can maintain
            # a deque in ascending order.
            while min_deque and nums[min_deque[-1]] >= value:
                min_deque.pop()
            min_deque.append(right)

            # Check the conditions of our subarray; if we have exceeded the limit, move the left pointer until we are
            # under the limit.
            #
            # After moving the left pointer, it could be the case that we have to update our min/max deque as it is no
            # longer being considered as part of the subarray
            min_index = min_deque[0]
            max_index = max_deque[0]
            while abs(nums[max_index] - nums[min_index]) > limit:
                left += 1

                # If we've moved past the min index, remove the min index from the front of the deque.  Note that we are
                # comparing indices here, not actual values.
                if min_deque[0] < left:
                    min_deque.popleft()

                # Alternatively, if we've moved past the max index, remove the max index from the front of the deque.
                # Note that we are comparing indices here, not actual values.
                if max_deque[0] < left:
                    max_deque.popleft()

                min_index = min_deque[0]
                max_index = max_deque[0]

            result = max(result, right - left + 1)

        return result
