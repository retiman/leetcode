# DIFFICULTY: MEDIUM
# ------------------
#
# Given the root of a binary tree, return the vertical order traversal of its nodes' values. (i.e., from top to bottom,
# column by column).
#
# If two nodes are in the same row and column, the order should be from left to right.
#
# See https://leetcode.com/problems/binary-tree-vertical-order-traversal
from collections import defaultdict, deque
from leetcode.tree.common.tree_node import TreeNode


class Solution:
    def verticalOrder(self, root: TreeNode | None) -> list[list[int]]:
        """
        SOLUTION
        --------

        There is no straightforward vertical order traversal.  However, a standard level order traversal can be used to
        get part of the way there.  If we assume that the root is at row 0 and column 0, we can do some bookkeeping
        while we traverse the nodes to assign a coordinate to every single node.

        While doing the traversal, we can keep track of a Map<Column, TreeNode[]> where each column is mapped to an
        array of nodes in the order they were encountered.  By doing a level order traversal (or BFS), we can ensure
        that nodes in the same "row" are encountered from left to right.

        COMPLEXITY
        ----------

        Time complexity is O(n) where n is the number of nodes.  The result computation at the end will run in O(k)
        time where k is the number of columns.  However, you're always guaranteed to have more nodes than columns (or
        the same) so overall time complexity is still O(n).

        Space complexity is O(n) because we are storing k columns mapping to lists of nodes, but the overall number of
        nodes stored in the map is at most n.  We are also using a queue, which has at most n nodes in it.
        """
        if not root:
            return []

        # Keep a map of column to nodes values.  Note that we don't actually need to store their row values, because if
        # we visit the nodes in the right order, the array will already be sorted by row.  The key is to push the left
        # child before the right child.
        mapping: dict[int, list[int]] = defaultdict(list)

        # We DO need to store the column values in our BFS queue though.  That's because as we shift items off the
        # queue, we will need to know which column it's in, so we can add it to the TreeNode array in the map above.
        queue: deque[tuple[TreeNode, int]] = deque([(root, 0)])

        # Finally, we have to keep track of the min and max columns so we know where to start with the vertical order
        # list.
        min_col = 0
        max_col = 0

        # The rest of the algorithm is a standard BFS.  We don't need to maintain a visited set because the nodes are
        # guaranteed to be organized as a tree, so we can't visit the same node twice.
        while queue:
            (node, col) = queue.popleft()

            # Add the node to this map for bookkeeping.
            mapping[col].append(node.val)

            # Update min/max columns.
            min_col = min(min_col, col)
            max_col = max(max_col, col)

            # Enqueue the children as usual in BFS, but make sure to enqueue the LEFT child first to keep our proper row
            # order.
            if node.left:
                queue.append((node.left, col - 1))
            if node.right:
                queue.append((node.right, col + 1))

        # Now we have a map of Column -> TreeNode[], and for each column, we just print out the values in the row.
        result: list[list[int]] = []
        for col in range(min_col, max_col + 1):
            # These node values are already in row order because we visited the left child before the right.
            values = mapping[col]
            result.append(values)

        return result
