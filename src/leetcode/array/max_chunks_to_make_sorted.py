# DIFFICULTY: MEDIUM
# ------------------
#
# You are given an integer array arr of length n that represents a permutation of the integers in the range [0, n - 1].
#
# We split arr into some number of chunks (i.e., partitions), and individually sort each chunk. After concatenating
# them, the result should equal the sorted array.
#
# Return the largest number of chunks we can make to sort the array.
#
# See https://leetcode.com/problems/max-chunks-to-make-sorted
class Solution:
    def maxChunksToSorted(self, xs: list[int]) -> int:
        """
        SOLUTION
        --------

        Because we know the elements in the array are a permutation of numbers less than n, we can use a greedy approach
        by keeping track of the max element seen so far.

        Unlike the other problem, this does not require using a stack.

        COMPLEXITY
        ----------

        Time complexity is O(n).

        Space complexity is O(1).
        """
        chunks = 0
        max_chunks = 0

        for i, x in enumerate(xs):
            max_chunks = max(x, max_chunks)

            # Because all elements are a permutation of the numbers from 0 to xs.length - 1, if we encounter i === max,
            # this means that for sure all elements < i can be sorted to form a chunk.
            #
            # Again, because all elements to the right of i are going to be greater than max (and i), then we can be
            # sure that the next element begins a new chunk.
            if i == max_chunks:
                chunks += 1

        return chunks
