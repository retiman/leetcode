# DIFFICULTY: EASY
# ----------------
#
# Given the root of a binary tree, return the length of the diameter of the tree.
#
# The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or
# may not pass through the root.
#
# The length of a path between two nodes is represented by the number of edges between them.
#
# See https://leetcode.com/problems/diameter-of-binary-tree
from leetcode.tree.common.tree_node import TreeNode


class Solution:
    def diameterOfBinaryTree(self, root: TreeNode | None) -> int:
        """
        SOLUTION
        --------

        For any node, the longest path might:

        - Pass through the node, in which case the longest path is the longest path of the left and right subtrees, plus
          one.
        - Not pass through the node, in which case the longest path is the max of the longest path of the left and
          right.

        We can use DFS to traverse the tree and keep track of the longest path we've seen so far.

        COMPLEXITY
        ----------

        Time complexity is O(n) where n is the number of nodes in the tree.

        Space complexity is O(n) because of the recursive stack.
        """
        max_path = 0

        def dfs(node: TreeNode | None) -> int:
            nonlocal max_path

            if not node:
                return 0

            # Figure out the max depth of the left and right subtrees.
            left = dfs(node.left)
            right = dfs(node.right)

            # The left and right depths represent the current diameter of the tree rooted at this node.  We'll compare
            # it with the global max diameter.
            current_path = left + right
            max_path = max(max_path, current_path)

            # Return the max depth starting from the current node.  Whichever path (left or right) is longer will be the
            # max depth, but we'll add one to account for the current node.
            return max(left, right) + 1

        dfs(root)
        return max_path
