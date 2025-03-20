from leetcode.tree.common.tree_node import array2tree
from leetcode.tree.diameter_of_binary_tree import Solution


soln = Solution()


def test_case_1():
    tree = array2tree([1, 2, 3])

    assert soln.diameterOfBinaryTree(tree) == 2


def test_case_2():
    tree = array2tree([1, 2, 3, 4, 5])

    assert soln.diameterOfBinaryTree(tree) == 3
