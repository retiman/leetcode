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
        prefix_sum = [0]
        for num in nums:
            prefix_sum.append(prefix_sum[-1] + num)
        
        for i in range(2, len(prefix_sum)):
            for j in range(i - 2):
                if (prefix_sum[i] - prefix_sum[j]) % k == 0:
                    return True
        
        return False