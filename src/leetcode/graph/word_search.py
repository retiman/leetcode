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

        found = False

        def dfs(row: int, column: int, i: int) -> None:
            nonlocal found

            if found:
                return

            # Only continue down this path if the row is within bounds.
            if not (0 <= row < len(board)):
                return

            # Only continue down this path if the column is within bounds.
            if not (0 <= column <= len(board[row])):
                return

            # Only continue down this path if we've not visited this cell before.  Instead of using a visited set, we'll
            # modify the board itself to set a visited cell to "#".
            if board[row][column] == "#":
                return

            # Only continue down this path if our current string has fewer characters than our target.
            if i == len(word):
                return

            # Only continue down this path if the current character is one that we want.
            c = board[row][column]
            want = word[i]
            if c is not want:
                return

            # If we have reached the last index, check if we've found our target.
            if i == len(word) - 1:
                found = True
                return

            # Save this row/column's value so we can mark it as visited; we'll use a sentinel value to do so.
            board[row][column] = "#"

            dfs(row, column - 1, i + 1)
            dfs(row, column + 1, i + 1)
            dfs(row - 1, column, i + 1)
            dfs(row + 1, column, i + 1)

            board[row][column] = c

        for i in range(len(board)):
            for j in range(len(board[i])):
                #  Only start a DFS search if the word begins with the character we are looking at.
                if board[i][j] == word[0]:
                    dfs(i, j, 0)
                if found:
                    return True

        return False
