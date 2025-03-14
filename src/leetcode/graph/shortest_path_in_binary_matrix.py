# DIFFICULTY: MEDIUM
#
# Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix. If there is no clear
# path, return -1.
#
# A clear path in a binary matrix is a path from the top-left cell (i.e., (0, 0)) to the bottom-right cell
# (i.e., (n - 1, n - 1)) such that:
#
# - All the visited cells of the path are 0.
# - All the adjacent cells of the path are 8-directionally connected (i.e., they are different and they share an edge
#   or a corner).
# - The length of a clear path is the number of visited cells of this path.
#
# See https://leetcode.com/problems/shortest-path-in-binary-matrix
from collections import deque


class Solution:
    def shortestPathBinaryMatrix(self, grid: list[list[int]]) -> int:
        """
        SOLUTION
        --------

        Can be solved using BFS.  Just start from the top left cell and explore adjacent cells that have 0 value.

        Note the following:

        - We can explore all 8 directions, so we can go backwards.
        - We might not find a path.
        - The first cell might not even be visitable.
        - With BFS the first path that reaches the end is guaranteed to be the shortest.
        - If we had used DFS, we'd need to explicitly keep track of the shortest path because the first path to finish may
          not be the shortest.

        COMPLEXITY
        ----------

        Time complexity is O(n^2).  Each cell is visited at most once.  On each visited a max of 8 directions are
        considered.

        Space complexity is O(n^2) to store the visited cells and the queue.
        """
        # The problem says that you MUST start at the top left, so if the top left cell is 1, you have nowhere to go.
        if grid[0][0] == 1:
            return -1

        # Keep a set of visited cells for BFS.
        visited: set[tuple[int, int]] = set()

        # Store a queue of (x, y, length).
        queue: deque[tuple[int, int, int]] = deque()

        # Start at the (0, 0) cell with length = 1.
        queue.append((0, 0, 1))
        while queue:
            x, y, length = queue.popleft()

            # First check if this cell has been visited, and if it has, simply skip it.  Store the cell as a string in a
            # set, since we can't store the object directly.
            if (x, y) in visited:
                continue

            # Mark this cell as visited.
            visited.add((x, y))

            # Note that if we're at the very last cell, we can return it immediately.  Because we are using BFS, the
            # very first path that reaches the end is guaranteed to be the shortest.
            #
            # We don't have to store the path or otherwise distinguish between paths because all shortest paths have the
            # same length.
            if x == len(grid) - 1 and y == len(grid[0]) - 1:
                return length

            # Note that we can actually move backwards (and we might be required to) since we can explore all 8
            # directions.  Generate the coordinates of the 8 directions, then filter out the ones that are out of
            # bounds, and explore the rest.
            coordinates = [
                [x - 1, y],
                [x, y - 1],
                [x - 1, y - 1],
                [x + 1, y],
                [x, y + 1],
                [x + 1, y + 1],
                [x - 1, y + 1],
                [x + 1, y - 1],
            ]
            for fx, fy in coordinates:
                if not (0 <= fx < len(grid)):
                    continue
                if not (0 <= fy < len(grid[0])):
                    continue
                if grid[fx][fy] != 0:
                    continue
                queue.append((fx, fy, length + 1))

        # If we've exhausted all paths without reaching the end, that means we couldn't do it.
        return -1
