# DIFFICULTY: EASY
# ----------------
#
# Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the
# elements may be changed. Then return the number of elements in nums which are not equal to val.
#
# Consider the number of elements in nums which are not equal to val be k, to get accepted, you need to do the
# following things:
#
# - Change the array nums such that the first k elements of nums contain the elements which are not equal to val.
#   The remaining elements of nums are not important as well as the size of nums.
# - Return k.
#
# See https://leetcode.com/problems/remove-element
class Solution:
    def removeElement(self, nums: list[int], val: int) -> int:
        """
        SOLUTION
        --------

        The solution is very similar to the remove duplicates from sorted array problem.  We just need to maintain two
        pointers; one that moves through the array at normal speed and another that moves only when we find an element
        that is not equal to val.

        COMPLEXITY
        ----------

        Time complexity is O(n) where n is the number of elements in the array.

        Space complexity is O(1).
        """
        # Initialize the first pointer that moves through the array at normal speed.  The first element is always
        # unique.
        i = 0

        # Initialize the second pointer to move only if we found an element not equal to val.
        j = 0

        while i < len(nums):
            current = nums[i]

            # If we found an element that's not equal to val, we should keep it.  So copy it to the j pointer.
            if current != val:
                nums[j] = current
                j += 1

            # Now advance the other pointer to continue through the array.
            i += 1

        # The index j represents the number of elements that are not equal to val.  That means j === k, so we can return
        # it directly.  Contrast this with remove duplicates from sorted array.
        return j
