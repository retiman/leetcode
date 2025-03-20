# DIFFICULTY: EASY
# ----------------
#
# Given the root node of a binary search tree and two integers low and high, return the sum of values of all nodes
# with a value in the inclusive range [low, high].
#
# See https://leetcode.com/problems/range-sum-of-bst
from leetcode.tree.common.tree_node import TreeNode


class Solution:
    def rangeSumBST(self, root: TreeNode | None, low: int, high: int) -> int:
        """
        SOLUTION
        --------

        A simple recursive solution will work.

        COMPLEXITY
        ----------

        The time complexity is O(n) where n is the number of nodes in the tree.
        """
        range_sum = 0

        def traverse(node: TreeNode | None):
            nonlocal range_sum

            if not node:
                return

            if low <= node.val <= high:
                range_sum += node.val

            traverse(node.left)
            traverse(node.right)

        traverse(root)
        return range_sum
