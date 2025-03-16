# DIFFICULTY: HARD
# ----------------
#
# Given an m x n board of characters and a list of strings words, return all words on the board.
#
# Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or
# vertically neighboring. The same letter cell may not be used more than once in a word.
#
# See https://leetcode.com/problems/word-search-ii
class TrieNode:
    def __init__(self) -> None:
        self.children: dict[str, TrieNode] = {}
        self.isTerminated = False

    def add(self, word: str) -> None:
        node: TrieNode = self
        for c in word:
            if c not in node.children:
                node.children[c] = TrieNode()
            node = node.children[c]
        node.isTerminated = True


class Solution:
    def findWords(self, board: list[list[str]], words: list[str]) -> list[str]:
        """
        SOLUTION
        --------

        This problem looks like it can be solved with a prefix trie.

        1. Construct a prefix trie from the list of words.
        2. Run DFS from each board cell, choosing to continue the search if the sequence seen so far is a valid prefix
           in the trie.
        3. Collect valid words from each DFS and return the result.

        Easy peasy.

        COMPLEXITY
        ----------

        Time complexity is O(w * k + m * n * 4^k) where w is the number of words, k is the maximum word length, m and n
        are the dimensions of the board.  Building the trie takes O(w * k).  For DFS, we perform DFS on every cell (of
        which there are m * n cells), and the length of each word in a DFS call is L, but there is a branching factor of
        4.

        Space complexity is O(w * k + k) due to the trie storage and the DFS stack.
        """
        # Construct the prefix trie for efficient lookup.
        root = TrieNode()
        for word in words:
            root.add(word)

        # Define a DFS function to run over each cell.  We could potentially make the DFS more efficient by creating the
        # visited matrix once and then mutating it over each DFS visitation.
        result: set[str] = set()

        def dfs(node: TrieNode, visited: set[tuple[int, int]], word: str, row: int, column: int) -> None:
            # If we've reached the end of a word, do not return right away; we might be able to reach a longer word if
            # we keep going.  Record the one we've seen so far though.
            if node.isTerminated:
                result.add(word)

            # The frontier nodes could be any direction up, down, left, or right, but not diagonal.
            frontier = [(row + 1, column), (row - 1, column), (row, column + 1), (row, column - 1)]
            for x, y in frontier:
                # Do not consider frontier cells that are out of bounds.
                if not (0 <= x < len(board)):
                    continue

                if not (0 <= y < len(board[x])):
                    continue

                # Do not consider visited cells.
                if (x, y) in visited:
                    continue

                # Do not consider cells that do not form a word.
                c = board[x][y]
                if c not in node.children:
                    continue

                # Continue DFS using the next TrieNode.
                next = node.children[c]

                # Mark this cell as visited, and continue the DFS search.  After the search completes, we should unmark
                # visited cells (unlike regular DFS) because a different direction may yield different words, so we'll
                # want reconsider these previously visited cells.
                visited.add((x, y))
                dfs(next, visited, word + c, x, y)
                visited.remove((x, y))

        # Perform DFS on every cell.
        for i in range(len(board)):
            for j in range(len(board[i])):
                c = board[i][j]
                if c not in root.children:
                    continue

                node = root.children[c]
                visited = {(i, j)}
                dfs(node, visited, c, i, j)

        return list(result)
