# DIFFICULTY: MEDIUM
#
# Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.
#
# If target is not found in the array, return [-1, -1].
#
# You must write an algorithm with O(log n) runtime complexity.
#
# See https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array
class Solution:
    def searchRange(self, xs: list[int], target: int) -> list[int]:
        """
        SOLUTION:

        The problem stipulates it must run in O(log n) time complexity, so that means we can't just do a standard binary
        search and then a linear scan for the start and end ranges.

        The most braindead simple way to do this is to do binary search twice.  Once using the left-most duplicate
        technique and once using the right-most duplicate technique.

        Technically we could combine both the left and right searches into one binary search, using a flag to denote the
        direction we are searching in.  But that would be a bit more complex and harder to understand.

        COMPLEXITY:

        Time complexity is O(log n) time complexity because of max two binary searches.

        Space complexity is O(1) space complexity.
        """

        # Run binary search using the left-most duplicate technique.  Here if we find that the the middle element is
        # less than the target, we move to the right.
        #
        # Otherwise if the middle element is greater than or equal to the target, we move to the left (guaranteeing that
        # if we find a duplicate target, we will keep moving left).
        def binarySearchLeft() -> int:
            left = 0
            right = len(xs)

            while left < right:
                mid = (left + right) // 2
                if xs[mid] < target:
                    left = mid + 1
                else:
                    right = mid

            # If we have found the target, return the index, otherwise return -1.
            if left < len(xs) and xs[left] == target:
                return left
            else:
                return -1

        # Run binary search using the right-most duplicate technique.  Here if we find that the the middle element is
        # greater than the target, we move to the left.
        #
        # Otherwise if the middle element is less than or equal to the target, we move to the right (guaranteeing that
        # if we find a duplicate target, we will keep moving right).
        def binarySearchRight() -> int:
            left = 0
            right = len(xs)

            while left < right:
                mid = (left + right) // 2
                if xs[mid] > target:
                    right = mid
                else:
                    left = mid + 1

            if right > 0 and xs[right - 1] == target:
                return right - 1
            else:
                return -1

        # Now we just run both binary searches and return the range.
        left = binarySearchLeft()
        if left == -1:
            return [-1, -1]

        right = binarySearchRight()
        return [left, right]
