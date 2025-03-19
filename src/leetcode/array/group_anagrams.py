# DIFFICULTY: MEDIUM
# ------------------
#
# Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.
#
# An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all
# the original letters exactly once.
#
# See https://leetcode.com/problems/group-anagrams
from collections import defaultdict


class Solution:
    def groupAnagrams(self, texts: list[str]) -> list[list[str]]:
        """
        SOLUTION
        --------

        Each anagram can be rearranged into canonical form by sorting the letters.  Then simply map the canonical form to
        each anagram.

        COMPLEXITY
        ----------

        Time complexity is O(n * m * log m) where n is the number of strings, and m is the length of the longest string.
        This is because we have to sort each string's characters in O(m * log m), and there are n strings.

        Space complexity is O(m * n).
        """
        # Define a map of canonical representation -> list of anagrams.
        mapping: dict[str, list[str]] = defaultdict(list)

        for text in texts:
            canonical = "".join(sorted(text))
            mapping[canonical].append(text)

        return list(mapping.values())
