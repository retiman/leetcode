# DIFFICULTY: EASY
# ----------------
#
# Given an array of strings words, return true if it forms a valid word square.
#
# A sequence of strings forms a valid word square if the kth row and column read the same string, where
# 0 <= k < max(numRows, numColumns).
#
# See https://leetcode.com/problems/valid-word-square
class Solution:
    def validWordSquare(self, words: list[str]) -> bool:
        """
        SOLUTION
        --------
        
        A naive solution works.
        
        COMPLEXITY
        ----------
        
        Time complexity is O(m * n).
        
        Space complexity is O(1).
        """
        for i in range(len(words)):
            for j in range(len(words[i])):
                try:
                    if words[i][j] != words[j][i]:
                        return False
                except IndexError:
                    return False

        return True
