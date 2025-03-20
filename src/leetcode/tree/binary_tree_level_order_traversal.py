# DIFFICULTY: MEDIUM
# ------------------
#
# Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right,
# level by level).
#
# See https://leetcode.com/problems/binary-tree-level-order-traversal
from collections import deque
from leetcode.tree.common.tree_node import TreeNode


class Solution:
    def levelOrder(self, root: TreeNode | None) -> list[list[int]]:
        """
        SOLUTION
        --------

        This is essentially a BFS algorithm from the root node.

        COMPLEXITY
        ----------

        Each node is visited once, so the time complexity is O(n).
        """
        if not root:
            return []

        result: list[list[int]] = []
        queue: deque[TreeNode] = deque([root])

        # Consume the nodes in the current level while noting the frontier nodes.  The nodes at the current level will
        # be recorded, then the frontier nodes are added to the queue.
        while queue:
            level: list[int] = []
            frontier: list[TreeNode] = []

            # Consume all the nodes from the current level and record them.  Don't use the queue.length in the for loop
            # as we are going to be modifying the queue during the loop.
            for _ in range(len(queue)):
                node = queue.popleft()
                level.append(node.val)

                if node.left:
                    frontier.append(node.left)
                if node.right:
                    frontier.append(node.right)

            # Add the recorded nodes at this level to the result.
            result.append(level)

            # Continue processing frontier nodes.
            queue.extend(frontier)

        return result
