# DIFFICULTY: MEDIUM
# ------------------
#
# We have an array of integers, nums, and an array of requests where requests[i] = [starti, endi]. The ith request asks
# for the sum of nums[starti] + nums[starti + 1] + ... + nums[endi - 1] + nums[endi]. Both starti and endi are
# 0-indexed.
#
# Return the maximum total sum of all requests among all permutations of nums.
#
# Since the answer may be too large, return it modulo 10^9 + 7.
#
# See https://leetcode.com/problems/maximum-sum-obtained-of-any-permutation
class Solution:
    def maxSumRangeQuery(self, nums: list[int], requests: list[list[int]]) -> int:
        """
        SOLUTION
        --------

        This question is asking for a very weird thing.

        Here, the request ranges don't change; they want to sum the values of the range.  However, the nums array can be
        in any order you want.  The ask is to find the order of nums that gives you the maximum sum across ALL requests,
        and then return that maximum sum (not the specific order).

        This will happen if the most frequently asked for numbers are matched up with the largest numbers.  So
        basically, sort the nums in descending order by frequency.

        COMPLEXITY
        ----------

        Time complexity is O(n log n) because we are sorting the requests.

        Space complexity is O(n) because we are storing the frequency of each index.
        """
        # First, calculate for each index i, how many times that index is requested.
        freq = [0] * len(nums)
        for request in requests:
            [start, end] = request

            # This is the difference array technique, usable when we want to efficiently apply multiple operations to a
            # single array.  Here, the naive way to compute frequency would be to do an inner loop and and increment
            # each element between start and end by x (here x = 1).
            #
            # Instead, use the difference array and prefix sums to compute the actual frequencies.  A prefix sum will
            # carry the value of x (here x = 1) from start through to the end of the array.  However, if we set
            # freq[end+1] = -x, then the propagated sum effectively gets "turned off" after adding x to freq[end].
            freq[start] += 1
            if end + 1 < len(nums):
                freq[end + 1] -= 1

        # Next, we can calculate the actual frequency of each element by taking the prefix sum of the array.  This
        # propagates sums of values at i through to the end of the array (except for spots where we have strategically
        # "turned off" the propagation to make it only apply to a range).
        for i in range(1, len(freq)):
            freq[i] += freq[i - 1]

        # Now we want to sort the frequencies AND nums in descending order, so we can match up the highest frequency
        # asks with the largest number.
        #
        # Note that this makes us lose track of the indices, but that's okay.  Every single element in freq represents
        # the number of times some value is asked for.  Every request is honored, so every value will be asked for.
        #
        # On top of that, the question asks for the maximum sum across ALL queries, so it's not even necessary to keep
        # track of any individual query.  In the end we'll sum everything together anyways.
        nums.sort(reverse=True)
        freq.sort(reverse=True)

        # Now it's just a matter of summing every single request value by matching it up with the largest number.
        # Remember that the totality of freq's request values will cover all range queries.  Since we don't care about
        # the max for any individual query, we can just add them ALL up.
        modulus = 1e9 + 7
        result = 0
        for i in range(len(nums)):
            result = (result + nums[i] * freq[i]) % modulus

        return int(result)
