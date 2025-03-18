# DIFFICULTY: MEDIUM
# ------------------
#
# You are given an integer array nums and a positive integer k.
#
# Return the number of subarrays where the maximum element of nums appears at least k times in that subarray.
#
# A subarray is a contiguous sequence of elements within an array.
#
# See https://leetcode.com/problems/count-subarrays-where-max-element-appears-at-least-k-times
class Solution:
    def countSubarrays(self, nums: list[int], k: int) -> int:
        """
        SOLUTION
        --------

        Use the sliding window technique to count the number of subarrays with at least k elements.  Expand the window
        from the right until we have k elements, counting occurrences of the max element.  Shrink the window from the
        left when the maximum element appears at least k times in the window.

        COMPLEXITY
        ----------
        Time complexity is O(n) where n is the number of elements in the list.

        Space complexity is O(n) because we are storing the number of times each element appears in the window.
        """
        max_element = max(nums)

        # The number of subarrays where the maximum element appears at least k times.
        subarrays = 0

        # The number of times max_element appears in the current window.
        count = 0

        # Use the sliding window technique to count the number of subarrays with at least k elements.
        left = 0
        right = 0
        for right in range(len(nums)):
            if nums[right] == max_element:
                count += 1

            while count >= k:
                subarrays += len(nums) - right

                if nums[left] == max_element:
                    count -= 1

                left += 1

        return subarrays
