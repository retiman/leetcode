# DIFFICULTY: EASY
# ----------------
#
# Given an integer x, return true if x is a palindrome, and false otherwise.
#
# See https://leetcode.com/problems/palindrome-number
class Solution:
    def isPalindrome(self, x: int) -> bool:
        """
        SOLUTION
        --------

        Convert the integer to a string and compare the string to its reverse.

        COMPLEXITY
        ----------

        Time complexity is O(n) where n is the number of digits in x.

        Space complexity is O(n).
        """
        return str(x) == str(x)[::-1]
