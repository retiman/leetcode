# DIFFICULTY: MEDIUM
# ------------------
#
# Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is
# closest to target.
#
# Return the sum of the three integers.
#
# You may assume that each input would have exactly one solution.
#
# See https://leetcode.com/problems/3sum-closest
import math


class Solution:
    def threeSumClosest(self, xs: list[int], target: int) -> int:
        """
        SOLUTION
        --------

        We'll use the two pointer technique to zero in on the target sum while iterating through the array.  To make
        calculations easier, we have to sort the array.

        COMPLEXITY
        ----------

        Time complexity is O(n^2) where n is the number of elements in the array.

        Space complexity is O(1).
        """
        xs.sort()

        closest_sum = math.inf
        closest_values = []

        for i in range(len(xs) - 2):
            # Use the two pointer technique to find the closest triple.  We will move the left pointer forward, or move
            # the right pointer backwards as we attempt to get close to our target sum.
            #
            # Initialize the left pointer to the right of i, and initialize the right pointer at the end of the array.
            # We will begin moving the left and right pointers closer to each other as we attempt to compute the triple.
            left = i + 1
            right = len(xs) - 1

            while left < right:
                # If the current sum is closer than what we have, update the closest sum and the triple.
                current_sum = xs[i] + xs[left] + xs[right]
                current_distance = abs(current_sum - target)
                closest_distance = abs(closest_sum - target)
                if current_distance < closest_distance:
                    closest_sum = current_sum
                    closest_values = [xs[i], xs[left], xs[right]]

                # If we've matched the target sum, just return right away.
                if closest_sum == target:
                    return sum(closest_values)

                # Update the left and right pointers, and try again.  Because we've sorted the array, we can move the
                # pointers accordingly.  If the sum is too small, move the left pointer forwards.  If the sum is too
                # big, move the the right pointer backwards.
                if current_sum < target:
                    left += 1
                else:
                    right -= 1

        return sum(closest_values)
