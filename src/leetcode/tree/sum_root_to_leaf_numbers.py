# DIFFICULTY: MEDIUM
# ------------------
#
# You are given the root of a binary tree containing digits from 0 to 9 only.
#
# Each root-to-leaf path in the tree represents a number.
#
# For example, the root-to-leaf path 1 -> 2 -> 3 represents the number 123.
#
# Return the total sum of all root-to-leaf numbers. Test cases are generated so that the answer will fit in a 32-bit
# integer.
#
# A leaf node is a node with no children.
#
# See https://leetcode.com/problems/sum-root-to-leaf-numbers
from leetcode.tree.common.tree_node import TreeNode


class Solution:
    def sumNumbers(self, root: TreeNode | None) -> int:
        """
        SOLUTION
        --------

        This is a simple DFS problem.  Just keep track of the current number as you traverse the tree.  If you reach a
        leaf, add it to the running tally and sum up all the numbers at the end.

        COMPLEXITY
        ----------

        Time complexity is O(n) where n is the number of nodes in the tree.

        Space complexity is O(n) for the call stack.
        """
        xs: list[int] = []

        def dfs(node: TreeNode | None, sum: int) -> None:
            nonlocal xs

            if not node:
                return

            # Only add to the running list if we're at a leaf.
            x = sum * 10 + node.val
            if not node.left and not node.right:
                xs.append(x)
                return

            dfs(node.left, x)
            dfs(node.right, x)

        dfs(root, 0)
        return sum(xs)
