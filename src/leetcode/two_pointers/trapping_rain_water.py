# DIFFICULTY: HARD
# ----------------
#
# Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water
# it can trap after raining.
#
# See https://leetcode.com/problems/trapping-rain-water
class Solution:
    def trap(self, elevation_map: list[int]) -> int:
        """
        SOLUTION
        --------

        Note that for this question, the leftmost element of the elevation map doesn't trap any water, because there is
        no land/bar to the left of the leftmost element.

        Similarly, for the rightmost element, any depression of the land/bar doesn't trap any water because there isn't
        any elevation to the right of the rightmost element.

        To solve this we can use the two pointers technique to compute trapped rainwater on a pointer by pointer basis,
        advancing the pointers.

        COMPLEXITY
        ----------

        Time complexity is O(n) where n is the number of elements in the elevation map.

        Space complexity is O(1).
        """
        # The difference between the lowest height and the smaller of the max height from the left and right sides
        # contributes to that many units of trapped rainwater AT THE CURRENT INDEX.
        #
        # For example, a current elevation of zero with a max elevation of 4 and 6 on the left and right sides
        # respectively will hold 4 units of trapped rainwater.  We'll use this information to compute rainwater at each
        # index.
        trapped = 0

        # Track the maximum height on the left side and right side, based on where our pointers land.  The smaller of
        # these two values will be the height we will use to compute trapped rainwater (since any rainwater over the
        # smaller value will spill out).
        left_max = 0
        right_max = 0
        max_value = 0

        # Use the two pointers technique to compute the trapped rainwater.
        left = 0
        right = len(elevation_map) - 1
        while left < right:
            # Update the left and right max values, then compute the smaller of these two values to figure out the
            # amount of rainwater we can actually trap.
            left_max = max(left_max, elevation_map[left])
            right_max = max(right_max, elevation_map[right])

            # This is the max amount we can trap with an elevation of zero.  We compute the elevation next to figure out
            # how much is really trapped.
            max_value = min(left_max, right_max)

            # Compute the trapped rainwater from one of the pointers, then advance it.
            #
            # Choose to advance the pointer associated with the smaller height inward, so that we have the opportunity
            # to move to a higher elevation and trap more water.
            if elevation_map[left] < elevation_map[right]:
                elevation = elevation_map[left]
                trapped += max_value - elevation
                left += 1
            else:
                elevation = elevation_map[right]
                trapped += max_value - elevation
                right -= 1

        return trapped
