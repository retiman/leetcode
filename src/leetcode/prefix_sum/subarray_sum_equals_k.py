# DIFFICULTY: MEDIUM
# ------------------
#
# Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.
#
# A subarray is a contiguous non-empty sequence of elements within an array.
#
# See https://leetcode.com/problems/subarray-sum-equals-k
class Solution:
    def subarraySum(self, nums: list[int], k: int) -> int:
        """
        SOLUTION
        --------

        Many fixed size subarray problems can be solved using the sliding window technique.  Here, if we ONLY had
        positive numbers, we could use the sliding window technique to find subarrays that sum to k.  However, there
        could be negative numbers and zeroes, so we can't do it.

        The brute force approach is to generate all subarrays and check if the sum equals k.  This is O(n^2) time
        complexity. Instead, we'll use a prefix sum and hashmap to reduce the time complexity to O(n).

        - Use a prefix sum to track sums up to each index.
        - Use a hashmap to track the frequency of each sum.
        - Check if a prefix sum difference equals k to find valid subarrays.

        That is, if prefix[j] - prefix[i] = k, then we know that a subarray from (i, j] has a sum of k.  Rearranging, we
        get then prefix[j] = prefix[i] - k.  If prefix[i] exists in our map, we know at least one subarray exists that
        sums to k.

        COMPLEXITY
        ----------

        Time complexity is O(n) because we are iterating through the list once.

        Space complexity is O(n) because we are storing the prefix sum array.
        """
        # This is the number of subarrays that sum to k.
        result = 0

        # This is prefix sum; it's not actually necessary to create an array to store the prefix sum.  We can just keep
        # a running sum.
        pj = 0

        # This is our map of prefix sums to their frequency.
        #
        # Note that we do need to maintain a map here, instead of just a set of prefix sums.  This is because the array
        # could have negative numbers, repeated values, and zeroes.  This would cause prefix sums to repeat.
        #
        # Don't forget to seed the map with a prefix sum of 0 with frequency 1.  Without this seed, we'd miss subarrays
        # that start at the beginning of the array.
        map: dict[int, int] = {0: 1}

        for num in nums:
            pj += num

            # If prefix[j] - prefix[i] = k, then we know for sure that the subarray from (i, j] has a sum of k.  We can
            # compute prefix[i] = prefix[j] - k.
            pi = pj - k

            # If prefix[j] appears in the frequency map, we have at LEAST one subarray that sums to k.  Add the total
            # frequency to the result.
            result += map.get(pi, 0)

            # Now update the frequency map to account for this new prefix sum up to j.
            freq = map.get(pj, 0)
            map[pj] = freq + 1

        return result
