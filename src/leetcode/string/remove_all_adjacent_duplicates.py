# DIFFICULTY: EASY
#
# You are given a string s consisting of lowercase English letters. A duplicate removal consists of choosing two
# adjacent and equal letters and removing them.
#
# We repeatedly make duplicate removals on s until we no longer can.
#
# Return the final string after all such duplicate removals have been made. It can be proven that the answer is unique.
#
# See https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string
class Solution:
    def removeDuplicates(self, s: str) -> str:
        """
        SOLUTION
        --------

        Use a stack to keep track of the characters.  If the next character is the same as the top of the stack, pop the
        top of the stack.  Otherwise, push the character onto the stack.

        COMPLEXITY
        ----------

        Time complexity is O(n) where n is the length of s.

        Space complexity is O(n).
        """
        stack: list[str] = []

        for c in s:
            if stack and c == stack[-1]:
                stack.pop()
            else:
                stack.append(c)

        return "".join(stack)
