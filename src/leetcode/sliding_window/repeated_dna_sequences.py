# DIFFICULTY: MEDIUM
# ------------------
#
# The DNA sequence is composed of a series of nucleotides abbreviated as 'A', 'C', 'G', and 'T'.
#
# For example, "ACGAATTCCG" is a DNA sequence.
# When studying DNA, it is useful to identify repeated sequences within the DNA.
#
# Given a string s that represents a DNA sequence, return all the 10-letter-long sequences (substrings) that occur
# more than once in a DNA molecule. You may return the answer in any order.
#
# See https://leetcode.com/problems/repeated-dna-sequences
class Solution:
    def findRepeatedDnaSequences(self, s: str) -> list[str]:
        """
        SOLUTION
        --------

        We can use a sliding window to iterate through the string and keep track of the substrings we've seen so far.

        COMPLEXITY
        ----------

        Time complexity is O(n) where n is the length of the string.

        Space complexity is O(n) because we are storing the substrings in a set.
        """
        if len(s) < 10:
            return []

        seen: set[str] = set()
        repeated: set[str] = set()

        # We can use a sliding window to keep track of 10 character sequences, then if we have seen the sequence, add it
        # to the result.
        left = 0
        for right in range(9, len(s)):
            # Two options exist here, because substring takes the leftmost element (inclusive) and rightmost element
            # (exclusive).
            #
            # i) We could calculate right - left + 1 to account for us slicing from [0, 9 + 1).
            # ii) We could start right = 10, then set the loop condition to be right <= s.length instead of just <.
            #
            # The second approach makes it easier to avoid off by 1, but we do this here to show you have to tackle the
            # off by 1 head on.
            if right - left + 1 > 10:
                left += 1

            sequence = s[left : right + 1]
            if sequence in seen:
                repeated.add(sequence)
            else:
                seen.add(sequence)

        return list(repeated)
