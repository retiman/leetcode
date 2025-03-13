# DIFFICULTY: EASY
#
# Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
#
# An input string is valid if:
#
# Open brackets must be closed by the same type of brackets.
# Open brackets must be closed in the correct order.
# Every close bracket has a corresponding open bracket of the same type.
#
# See https://leetcode.com/problems/valid-parentheses
class Solution:
    def isValid(self, text: str) -> bool:
        """
        SOLUTION
        --------

        Simple stack based solution.

        COMPLEXITY
        ----------

        Time complexity is O(n) where n is the number of characters in the string.

        Space complexity is O(n).
        """
        map = {"(": ")", "{": "}", "[": "]"}
        stack = []

        for c in text:
            if c in map:
                stack.append(c)
                continue

            if c in map.values():
                if not stack:
                    return False
                open_c = stack.pop()
                if map[open_c] != c:
                    return False

        return not stack
