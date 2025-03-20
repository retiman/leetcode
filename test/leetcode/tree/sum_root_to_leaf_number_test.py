from leetcode.tree.common.tree_node import TreeNode
from leetcode.tree.sum_root_to_leaf_numbers import Solution


soln = Solution()


def test_case_1():
    tree = TreeNode(1)
    tree.left = TreeNode(2)
    tree.right = TreeNode(3)

    assert soln.sumNumbers(tree) == 25
