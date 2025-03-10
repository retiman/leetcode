# DIFFICULTY: MEDIUM
#
# There is an integer array nums sorted in ascending order (with distinct values).
#
# Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length)
# such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed).
# For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].
#
# Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums,
# or -1 if it is not in nums.
#
# You must write an algorithm with O(log n) runtime complexity.
#
# See https://leetcode.com/problems/search-in-rotated-sorted-array
class Solution:
    def search(self, xs: list[int], target: int) -> int:
        """
        SOLUTION:

        You can still use binary search for this; you just have to recognize when you have looped around in the array.
        This uses the standard binary search algorithm, but with recursion.

        The standard approach is used because we are looking for an exact match for an element in the array, and return
        -1 if the element is not found.
        """
        def searchInternal(ys: list[int], start: int, end: int, t: int) -> int:
            mid = (start + end) // 2
            if ys[mid] == t:
                return mid

            # If we've looped back around ourselves, that means the number wasn't found, and we can stop.
            if start > end:
                return -1

            # If the left portion is sorted, and our target is within that portion, update the start/end indexes to be
            # strictly within the left side of the pivot, and perform binary search there.
            #
            # Otherwise, it is in the right portion of the array, which contains a rotation.  Call this function again,
            # with an updated restriction on the sub array to search.
            isLeftSorted = ys[start] < ys[mid]
            isWithinLeftPortion = t >= ys[start] and t <= ys[mid - 1]

            if isLeftSorted and isWithinLeftPortion:
                return searchInternal(ys, start, mid - 1, t)

            if isLeftSorted and not isWithinLeftPortion:
                return searchInternal(ys, mid + 1, end, t)

            # If the right portion is sorted, and our target is within that portion, update the start/end indexes to be
            # strictly within the right side of the pivot, and perform binary search there.
            #
            # Otherwise, it is in the left portion of the array, which contains a rotation.  Call this function again,
            # with an updated restriction on the sub array to search.
            isRightSorted = not isLeftSorted
            isWithinRightPortion = t >= ys[mid + 1] and t <= ys[end]

            if isRightSorted and isWithinRightPortion:
                return searchInternal(ys, mid + 1, end, t)

            if isRightSorted and not isWithinRightPortion:
                return searchInternal(ys, start, mid - 1, t)

            return -1

        return searchInternal(xs, 0, len(xs) - 1, target)
