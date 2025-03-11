# DIFFICULTY: MEDIUM
#
# Given an integer array nums, find the subarray with the largest sum, and return its sum.
#
# See https://leetcode.com/problems/maximum-subarray
class Solution:
    def maxSubArray(self, xs: list[int]) -> int:
        """
        SOLUTION:

        Kadane's algorithm finds a solution in O(n) with O(1) extra space.

        The idea is to consider subarrays starting from the 0th, 1st, 2nd, etc element.  However, it is not necessary to
        consider the subarrays starting from 0, then 1, then 2, etc.

        It is enough to note that if all elements are positive, you want the entire array.  But if they are not all
        positive, then you want to only take elements until it's "not worth it".  To determine what is "not worth it",
        consider that if you start from the 0th index and continue to take elements, but the subarray sum becomes
        negative when it was positive before.  Then we know to abandon the entire subarray from 0 to that element.

        Generalizing, suppose we have a current subarray sum, and we add the next element.  If adding that next element
        causes the new current sum to be LESS than just that element by itself, we should abandon that subarray and
        start over.

        COMPLEXITY:

        Time complexity is O(n).

        Space complexity is O(1).
        """
        if len(xs) == 0:
            return 0

        if len(xs) == 1:
            return xs[0]

        # Start calculating the sum of the current subarray at i = 0.
        current = xs[0]
        max_value = xs[0]
        for x in xs[1:]:
            # If adding x makes our current sum larger, we'll take x and add it to our potential max subarray sum.
            if current + x > x:
                current += x
            # However, if adding x makes our current sum smaller, abandon the current subarray that was from where we
            # started to i.  We'll start counting the sum from a new subarray, starting at i instead.
            else:
                current = x

            max_value = max(current, max_value)

        return max_value
