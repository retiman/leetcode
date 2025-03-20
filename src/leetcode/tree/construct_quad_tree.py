# DIFFICULTY: HARD
# ----------------
#
# Given a n * n matrix grid of 0's and 1's only. We want to represent grid with a Quad-Tree.
#
# Return the root of the Quad-Tree representing grid.
#
# See https://leetcode.com/problems/construct-quad-tree
from leetcode.tree.common.quad_tree import Node


class Solution:
    def construct(self, grid: list[list[int]]) -> Node | None:
        """
        SOLUTION
        --------

        To make a quad tree, recursively divide the matrix into quadrants until each quadrant is all 1's or all 0's.

        COMPLEXITY
        ----------

        Time complexity is O(n^2) because we are visiting each cell in the grid.

        Space complexity is O(log n) because the recursion depth is limited by the size of the grid.
        """
        if not grid or not grid[0]:
            return None

        return self.__construct(grid, 0, 0, len(grid))

    def __construct(self, grid: list[list[int]], row: int, column: int, size: int) -> Node | None:
        node = Node()

        if self.__isUniform(grid, row, column, size):
            node.val = bool(grid[row][column])
            node.isLeaf = True
            return node

        # If the grid segment here isn't uniform, we'll need to create 4 quadrants and construct nodes out of all 4
        # of them.
        #
        # Setting the `node.val` of this node is irrelevant as it's not a leaf.  We can just use the default value.
        half = size // 2
        node.isLeaf = False
        node.topLeft = self.__construct(grid, row, column, half)
        node.topRight = self.__construct(grid, row, column + half, half)
        node.bottomLeft = self.__construct(grid, row + half, column, half)
        node.bottomRight = self.__construct(grid, row + half, column + half, half)
        return node

    # Checks if a quadrant of the grid starting at [row, column] is uniformly all 1's or all 0's.
    def __isUniform(self, grid: list[list[int]], row: int, column: int, size: int) -> bool:
        value = grid[row][column]
        for i in range(row, row + size):
            for j in range(column, column + size):
                if grid[i][j] != value:
                    return False

        return True
