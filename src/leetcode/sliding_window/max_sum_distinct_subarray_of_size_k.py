# DIFFICULTY: MEDIUM
# ------------------
#
# You are given an integer array nums and an integer k. Find the maximum subarray sum of all the subarrays of nums that
# meet the following conditions:
#
# - The length of the subarray is k, and
# - All the elements of the subarray are distinct.
#
# Return the maximum subarray sum of all the subarrays that meet the conditions. If no subarray meets the conditions,
# return 0.
#
# A subarray is a contiguous non-empty sequence of elements within an array.
#
# See https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k
class Solution:
    def maximumSubarraySum(self, xs: list[int], k: int) -> int:
        """
        SOLUTION
        --------

        Without the distinct requirement, we can use the sliding window technique with a window of size k, shifting the
        window as we look for the maximum sum.

        With the distinct element requirement, we need to maintain a set and disregard sub arrays that don't have unique
        elements.

        COMPLEXITY
        ----------

        Time complexity is O(n) where n is the number of elements in the list.

        Space complexity is O(n) because we are storing the elements in the window.
        """
        # Keep track of the current sum of the sub array, as well as the maximum sum we've seen so far.
        current_sum = 0
        max_sum = 0

        # Define a set to check if we have a distinct sub array.  We will update the window based on uniqueness and
        # compute a sum when we have k elements.
        uniques = set()

        # Build up our window by moving the right pointer.  We'll update the left pointer along the way in case we
        # detect a sub array with duplicate elements.
        left = 0
        right = 0
        while right < len(xs):
            value = xs[right]

            # If the current element is already in the sub array, advance the left pointer until we no longer have a
            # duplicate element.  We'll have to decrement the current sum to account for sliding the left pointer
            # forward.
            #
            # Note that xs.remove() will raise if the element is not present, so use xs.discard() instead.
            while value in uniques:
                uniques.discard(xs[left])
                current_sum -= xs[left]
                left += 1

            # Now that the sub array is free of dupes, we can add the current element to the sum.  Let's not update the
            # right pointer just yet; if we are over k elements, we want to leave the right pointer where it is for the
            # moment.
            current_sum += value
            uniques.add(value)

            # If, by adding this element, we've gone over k elements, shrink the window by moving the left pointer,
            # which should put us at exactly k elements.
            #
            # Note that we can check if we've violated the size constraint by checking the size of the `uniques` set,
            # which forms our contiguous set.  By adding a single element, the most we could've gone over by is one
            # element, so just check, and if we've done so, slide the left pointer forward again.
            #
            # Once within constraints we can fall through to the next block.
            if len(uniques) > k:
                uniques.discard(xs[left])
                current_sum -= xs[left]
                left += 1

            # If the sub array has exactly k elements at this iteration (or after we've shrink the window), update our
            # assumptions about the max sum and update the right pointer.
            if len(uniques) == k:
                max_sum = max(max_sum, current_sum)
                right += 1

            # If the sub array has fewer than k elements, grow the window by increasing the right pointer.
            if len(uniques) < k:
                right += 1

        return max_sum
