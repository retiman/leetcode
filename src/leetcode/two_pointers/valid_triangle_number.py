# DIFFICULTY: MEDIUM
# ------------------
#
# Given an integer array nums, return the number of triplets chosen from the array that can make triangles if we take
# them as side lengths of a triangle.
#
# See https://leetcode.com/problems/valid-triangle-number
class Solution:
    def triangleNumber(self, nums: list[int]) -> int:
        """
        SOLUTION
        --------

        To form a triangle, 3 numbers have to satisfy the inequalities:

        a + b > c
        a + c > b
        b + c > a

        The most straightforward approach is to sort the numbers and use the two pointer technique to find triples.

        COMPLEXITY
        ----------

        Time complexity is O(n^2) where n is the number of elements in the array.

        Space complexity is O(1).
        """
        if len(nums) <= 2:
            return 0

        # Once all elements are sorted, we know that if i < j < k, then nums[i] <= nums[j] <= nums[k].  Let a = nums[i],
        # b = nums[j], and c = nums[k].  We know that a <= b <= c.
        #
        # If we find that a + b > c, then we have found a triplet.  This is because:
        #
        # a + c > b, since c > b.
        # b + c > a, since c > a.
        #
        # Once we find a triplet, we know that all elements between the left and right pointer are valid.
        nums.sort()

        result = 0
        for i in range(len(nums) - 1, -1, -1):
            # Loop backwards to find our c, which we'll check if it is greater than a + b.
            c = nums[i]

            # Start at opposite ends of the array, [a, ...., b, c], and let a and b close in on each other to find a
            # valid triplet.  Starting this way lets us adjust a and b in the right directions to account for c.
            left = 0
            right = i - 1
            while left < right:
                a = nums[left]
                b = nums[right]

                # We have found a triplet; all elements between left and right can form a triplet.
                if a + b > c:
                    result += right - left

                    # Since c is large compared to a + b, advance the right pointer and make c smaller to find more
                    # triplets.
                    right -= 1
                else:
                    # Since c is small compared to a + b, advance the left pointer and make c bigger to find more
                    # triplets.
                    left += 1

        return result
