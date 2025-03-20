# DIFFICULTY: MEDIUM
# ------------------
#
# Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes
# you can see ordered from top to bottom.
#
# See https://leetcode.com/problems/binary-tree-right-side-view
from leetcode.tree.common.tree_node import TreeNode


class Solution:
    def rightSideView(self, root: TreeNode | None) -> list[int]:
        """
        SOLUTION
        --------

        We can use a simple DFS to traverse the tree, and prioritize the right child over the left child.  At each
        depth, we can add the first rightmost node to the result array, since that's the node we'll see when viewing it
        from the right.

        COMPLEXITY
        ----------

        Time complexity is O(n) because we are visiting each node once.

        Space complexity is O(n) because we are storing the nodes in a list.
        """
        depths: list[int] = []

        def dfs(node: TreeNode | None, depth: int) -> None:
            if not node:
                return

            # If the current depth is the lowest depth we've seen, then it's the rightmost node at this depth, because
            # we will always prioritize going down the right node.
            if depth == len(depths):
                depths.append(node.val)

            # Prioritize going down the right subtree first!
            dfs(node.right, depth + 1)
            dfs(node.left, depth + 1)

        dfs(root, 0)
        return depths
