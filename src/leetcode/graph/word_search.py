# DIFFICULTY: MEDIUM
#
# Given an m x n grid of characters board and a string word, return true if word exists in the grid.
#
# The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or
# vertically neighboring. The same letter cell may not be used more than once.
#
# See https://leetcode.com/problems/word-search
class Solution:
    def exist(self, board: list[list[str]], word: str) -> bool:
        """
        SOLUTION:

        This is just DFS; no need to build a prefix trie, in comparison to word search ii.  BFS isn't going to work as
        well because BFS will generate all possible words incrementally, whereas we want to just stop if we've found our
        word.

        COMPLEXITY:

        Time complexity is O(m * n * 4^k) where m and n are the dimensions of the board, and k is the length of the
        longest word.

        Space complexity is O(k).
        """
        if len(word) == 0:
            return False

        def dfs(row: int, column: int, i: int) -> bool:
            if i == len(word):
                return True

            # Only continue down this path if the row is within bounds.
            if not (0 <= row < len(board)):
                return False

            # Only continue down this path if the column is within bounds.
            if not (0 <= column < len(board[row])):
                return False

            # Only continue down this path if there's a match.
            c = board[row][column]
            if c != word[i]:
                return False

            # Save this row/column's value so we can mark it as visited; we'll use a sentinel value to do so.
            board[row][column] = "#"

            found = (
                dfs(row, column - 1, i + 1)
                or dfs(row, column + 1, i + 1)
                or dfs(row - 1, column, i + 1)
                or dfs(row + 1, column, i + 1)
            )

            board[row][column] = c

            return found

        for i in range(len(board)):
            for j in range(len(board[i])):
                #  Only start a DFS search if the word begins with the character we are looking at.
                if board[i][j] == word[0]:
                    if dfs(i, j, 0):
                        return True

        return False
