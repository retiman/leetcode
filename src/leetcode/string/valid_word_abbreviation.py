# DIFFICULTY: EASY
# ----------------
#
# A string can be abbreviated by replacing any number of non-adjacent, non-empty substrings with their lengths. The
# lengths should not have leading zeros.
#
# For example, a string such as "substitution" could be abbreviated as (but not limited to):
#
# "s10n" ("s ubstitutio n")
# "sub4u4" ("sub stit u tion")
# "12" ("substitution")
# "su3i1u2on" ("su bst i t u ti on")
# "substitution" (no substrings replaced)
# The following are not valid abbreviations:
#
# "s55n" ("s ubsti tutio n", the replaced substrings are adjacent)
# "s010n" (has leading zeros)
# "s0ubstitution" (replaces an empty substring)
# Given a string word and an abbreviation abbr, return whether the string matches the given abbreviation.
#
# A substring is a contiguous non-empty sequence of characters within a string.
#
# See https://leetcode.com/problems/valid-word-abbreviation
class Solution:
    def validWordAbbreviation(self, word: str, abbr: str) -> bool:
        """
        SOLUTION
        --------

        To do this, we'll use two pointers, but not to iterate through a single string.  Instead, each pointer iterates
        through its own string.  If we see an numerical abbreviation, we'll advance through the other string a the
        corresponding number of characters.  Because of that, this problem isn't categorized as a two-pointer problem.

        At each stage of advancement we'll check if the characters match.

        COMPLEXITY
        ----------

        Time complexity is O(max(m, n)) where m is the length of word, and n is the length of abbr.

        Space complexity is O(1).
        """
        i, j = 0, 0

        while i < len(word) and j < len(abbr):
            # If we have a digit in abbr, figure out the entire number, then skip over that many characters from the
            # word string.
            if abbr[j].isdigit():
                # If we have leading zeroes, like "s010n", then the abbreviation can never be valid.
                if abbr[j] == "0":
                    return False

                # Read in the number from the abbr string.
                num = 0
                while j < len(abbr) and abbr[j].isdigit():
                    num = num * 10 + int(abbr[j])
                    j += 1

                # Skip that many numbers from the word string.
                i += num

            # If we don't have a digit in abbr, we just need to compare that the characters in each string match.
            else:
                if i >= len(word) or word[i] != abbr[j]:
                    return False

                i += 1
                j += 1

        return i == len(word) and j == len(abbr)
