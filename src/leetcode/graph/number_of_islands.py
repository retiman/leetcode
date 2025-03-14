# DIFFICULTY: MEDIUM
#
# Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of
# islands.
#
# An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may
# assume all four edges of the grid are all surrounded by water.
#
# See https://leetcode.com/problems/number-of-islands
class Solution:
    def numIslands(self, grid: list[list[str]]):
        """
        SOLUTION
        --------

        We can execute DFS from every land mass to find connected land masses.  Each connected land mass constitutes 1
        island.

        We can either store the coordinates (i, j) in a set to avoid visiting the same cell twice, or we can simply
        write to the cell '0' for a visited land mass.  The latter will also avoid visiting the same cell twice.  We do
        the latter because that's what most interviewers want to see.

        COMPLEXITY
        ----------

        Time complexity is O(v + e).

        Space complexity is O(v + e).  We don't modify the input grid but the DFS stack frames do consume memory.
        """
        count = 0

        def dfs(i: int, j: int):
            if not (0 <= i < len(grid)):
                return

            if not (0 <= j < len(grid[i])):
                return

            if grid[i][j] == "0":
                return

            grid[i][j] = "0"
            dfs(i, j + 1)
            dfs(i, j - 1)
            dfs(i - 1, j)
            dfs(i + 1, j)

        for i in range(len(grid)):
            for j in range(len(grid[i])):
                if grid[i][j] == "1":
                    dfs(i, j)
                    count += 1

        return count
