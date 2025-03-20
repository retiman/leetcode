# DIFFICULTY: EASY
# ----------------
#
# Given the roots of two binary trees p and q, write a function to check if they are the same or not.
#
# Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.
#
# See https://leetcode.com/problems/same-tree
from leetcode.tree.common.tree_node import TreeNode


class Solution:
    def isSameTree(self, p: TreeNode | None, q: TreeNode | None) -> bool:
        """
        SOLUTION
        --------

        A simple recursive solution will work.

        COMPLEXITY
        ----------

        The time complexity is O(n) where n is the number of nodes in the tree.
        """
        if not p:
            return not q

        if not q:
            return not p

        if p.val != q.val:
            return False

        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)
