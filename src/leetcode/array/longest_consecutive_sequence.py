# DIFFICULTY: MEDIUM
#
# Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
#
# You must write an algorithm that runs in O(n) time.
#
# See https://leetcode.com/problems/longest-consecutive-sequence
class Solution:
    def longestConsecutive(self, xs: list[int]):
        """
        SOLUTION:

        The problem is phrased in a very confusing way.  The sequence doesn't ACTUALLY need to be consecutive within the
        array; it only needs to be consecutive if you plucked the sequence out of the array and sorted it.

        For example, [1, 500, 2, 3, 4] has consecutive elements [1, 2, 3, 4].  The fact that 500 appears in the middle
        is okay; the number 500 begins its own consecutive sequence of length 1.  The other elements [1, 2, 3, 4] create
        a sequence of length 4.

        Conceptually, we'll do this by throwing all the array elements into a set.  Then, for each element `x`, we can
        figure out if it's part of a sequence by repeatedly checking its predecessor `x - 1` in the set.

        COMPLEXITY:

        Time complexity is O(n).  It may appear that the inner loop runs multiple times, but each element in the array
        is only processed once; the inner loop will skip `x - 1` if it was already part of some other sequence from a
        previous iteration.

        Space complexity is O(n).
        """
        longest = 0

        # Use a set to keep track of all elements in the array; we'll reference it to find out if a predecessor to an
        # element exists as we iterate through the array.
        uniques: set[int] = set(xs)

        for x in uniques:
            # Let us consider if element x is part of some sequence.  We can do this by considering its predecessor,
            # x - 1.
            #
            # If x - 1 is not in the set, x must begin some new sequence.  Let's find out how long it is by incrementing
            # x until we can't find any more consecutive elements.
            if x - 1 not in uniques:
                # We know that x is in the array, so let's start checking x + 1 and onwards for the length of a
                # consecutive sequence.
                x = x + 1
                length = 1

                while x in uniques:
                    x += 1
                    length += 1

                # Once we run out of elements, we have determined the length of the sequence between at x.  We'll
                # compare it to the longest sequence we've found so far.
                longest = max(longest, length)
            else:
                # If x - 1 is in the set, we know it is part of some sequence.  However, this sequence must've already
                # been found by the inner loop above, so we can skip this element.
                pass

        return longest
