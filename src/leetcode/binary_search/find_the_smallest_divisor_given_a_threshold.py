# DIFFICULTY: MEDIUM
#
# Given an array of integers nums and an integer threshold, we will choose a positive integer divisor, divide all the
# array by it, and sum the division's result. Find the smallest divisor such that the result mentioned above is less
# than or equal to threshold.
#
# Each result of the division is rounded to the nearest integer greater than or equal to that element.
# (For example: 7/3 = 3 and 10/2 = 5).
#
# The test cases are generated so that there will be an answer.
#
# See https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold
import math


class Solution:
    def smallestDivisor(self, xs: list[int], threshold: int) -> int:
        """
        SOLUTION
        --------

        The smallest divisor is 1.  This would maximize the sum.

        The largest divisor is Math.max(...nums).  This would minimize the sum.

        We want a sum that is exactly the threshold or just belong.  This is a good candidate to use binary search.

        COMPLEXITY
        ----------

        Time complexity is O(n log k) where n is the length of the list and k is the max element in the list.

        Space complexity is O(1).
        """
        # Use the insert point binary search approach to find the divisor we want.
        left = 1
        right = max(xs)

        while left < right:
            mid = (left + right) // 2
            divisor = mid
            # We do math.ceil because the problem asks us to round up.
            #
            # Note: there's no way to chain map -> reduce.  Mind boggling.
            value = sum(math.ceil(x / divisor) for x in xs)

            # If the value is too large, our divisor was too small, so we should shift our left value to be mid + 1.
            if value > threshold:
                left = mid + 1
            # Otherwise, we should shift our right value to mid.
            else:
                right = mid

        # Found the divisor at the "insertion point".
        return left
