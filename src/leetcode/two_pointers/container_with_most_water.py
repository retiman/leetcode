# DIFFICULTY: MEDIUM
# ------------------
#
# You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of
# the ith line are (i, 0) and (i, height[i]).
#
# Find two lines that together with the x-axis form a container, such that the container contains the most water.
#
# Return the maximum amount of water a container can store.
#
# Notice that you may not slant the container.
#
# See https://leetcode.com/problems/container-with-most-water
class Solution:
    def maxArea(self, height: list[int]) -> int:
        """
        SOLUTION
        --------

        Use the two pointers technique to maximize the area.  We'll initialize at the left and right sides of the array,
        then advance the pointers inward and update our knowledge of the maximum area.

        We'll want to go from outside to inside, because if we have the highest columns on the outside, it's trivial to
        calculate the max area container.  The problem is if we have shorter columns over a long width, but we can adjust
        the pointers and max area as we move them inwards.

        To maximize the area, we should advance the pointer that points to the lowest height, in some hopes that we will
        reach a higher height area and get a bigger container.

        Note that if we advance a pointer and the height ends up lower, we'll end up with an area calculation that does
        not correspond to an actual container.  However, that "phantom container" will have a smaller max area than
        what was previously calculated, and it won't affect the actual result.

        COMPLEXITY
        ----------

        Time complexity is O(n) where n is the number of heights in the array.

        Space complexity is O(1).
        """
        max_area = 0
        left = 0
        right = len(height) - 1

        # Use left < right because there's no need to process left === right (that's a container with no area).
        while left < right:
            # Set the width to be the difference between left and right pointers.  The height should be the smaller of
            # the two heights referenced by the pointers.
            width = right - left
            h = min(height[left], height[right])
            max_area = max(max_area, width * h)

            # Now advance the pointers.  No matter which pointer we choose to advance, the width will decrease.
            #
            # To attempt to maximize the area, we should advance the pointer that points to the lowest height, in some
            # hopes that we will reach a higher height area and get a bigger container.
            #
            # Note that if we advance a pointer and the height ends up lower, we'll end up with an area calculation that
            # does not correspond to an actual container.  However, that "phantom container" will have a smaller max
            # area than what was previously calculated, and it won't affect the actual result.
            if height[left] < height[right]:
                left += 1
            else:
                right -= 1

        return max_area
