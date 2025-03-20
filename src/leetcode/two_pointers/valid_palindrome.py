# DIFFICULTY: EASY
# ----------------
#
# A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all
# non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and
# numbers.
#
# Given a string s, return true if it is a palindrome, or false otherwise.
#
# See {@link https://leetcode.com/problems/valid-palindrome/}
import re


class Solution:
    def isPalindrome(self, s: str) -> bool:
        """
        SOLUTION
        --------

        Use the two pointer technique to compare elements from the ends of the array to see if you have a match.

        COMPLEXITY
        ----------

        Time complexity is O(n).

        Space complexity is O(1).
        """
        # Replace all non-alphanumeric characters with an empty string.
        text = re.sub(r"[^a-zA-Z0-9]", "", s).lower()

        # Use left < right here because it's not necessary to check if the middle character matches itself.
        left = 0
        right = len(text) - 1
        while left < right:
            if text[left] != text[right]:
                return False

            left += 1
            right -= 1

        return True
