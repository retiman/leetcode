# DIFFICULTY: MEDIUM
# ------------------
#
# Given an integer array nums and an integer k, return true if nums has a good subarray or false otherwise.
#
# A good subarray is a subarray where:
#
# - its length is at least two, and
# - the sum of the elements of the subarray is a multiple of k.
#
# Note that:
#
# - A subarray is a contiguous part of the array.
# - An integer x is a multiple of k if there exists an integer n such that x = n * k. 0 is always a multiple of k.
#
# See https://leetcode.com/problems/continuous-subarray-sum
class Solution:
    def checkSubarraySum(self, nums: list[int], k: int) -> bool:
        """
        SOLUTION
        --------

        The brute force solution is to calculate the sum of all subarrays of length 2 or more and check if it's a
        multiple of of k.  To do so, compute the prefix sum of the array and use it to calculate the sum of the subarray
        from [i, j].

        A subarray sum from [i, j] can be calculated as prefixSum[j] - prefixSum[i] + nums[i].  We can check each
        subarray sum to see if it's a multiple of k and return true if we find one.  It is; however, O(n^2) to calculate
        subarray sums in this way.  Unfortunately, this will exceed the runtime limit for large arrays in LeetCode.

        To get a better solution we have to note that:

        sum[i, j] = prefixSum[j] - prefixSum[i] + nums[i]
        sum[i, j] = prefixSum[j] - prefixSum[i - 1]

        This is because the sum[i, j] is inclusive, and subtracting prefixSum[i] subtracts out nums[i].  That's why we
        either have to add it back in or use i - 1 as the index instead.  Afterwards, we can look at the sum modulo k:

        sum[i, j] (mod k) = (prefixSum[j] - prefixSum[i - 1]) (mod k)

        If we want sum[i, j] % k === 0, then we should write:

        (prefixSum[j] - prefixSum[i - 1]) (mod k) = 0
        prefixSum[j] (mod k) = prefixSum[i - 1] (mod k)

        In other words, if prefixSums at positions (i - 1) and j have the same remainder modulo k, then the subarray sum
        from [i, j] has remainder 0 modulo k.

        COMPLEXITY
        ----------

        Time complexity is O(n) because we are iterating through the list once.

        Space complexity is O(n) because we are storing the prefix sum array.
        """
        # Use a map of remainders -> index  to store the prefix sum remainders, so we can check later if we have seen
        # any remainders that are the same modulo k.
        remainders: dict[int, int] = {}

        # Maintain a running prefix sum as we loop through the array.
        prefix_sum = 0
        for i, num in enumerate(nums):
            prefix_sum += num
            r = prefix_sum % k

            # It might be the case that the remainder is negative, just as a quirk of how JavaScript handles the modulo
            # operator.
            #
            # For example, -5 % 3 = -2.  But this is wrong because -2 is not congruent to -5 modulo 3.  Instead:
            #
            # -5 (mod 3) = -5 + 3 (mod 3) = -2 (mod 3) = -2 + 3 (mod 3) = 1 (mod 3)
            #
            # That is, we want -5 % 3 = 1 instead.  To fix this, we half to add the modulus to the remainder if it's
            # negative.
            if r < 0:
                r += k

            # It's possible that the prefix sum already is a multiple of k.  And it's possible that the remainder 0
            # isn't in the remainders map yet.  In this case, just check if we have a subarray of length 2 or more.
            if r == 0 and i >= 1:
                return True

            # If this is a previously seen remainder, we can check if we have a "good" subarray.
            if r in remainders:
                j = remainders[r]
                if abs(i - j) >= 2:
                    return True
            # If we're seeing this remainder for the first time, store it in the map.
            else:
                remainders[r] = i

        return False
