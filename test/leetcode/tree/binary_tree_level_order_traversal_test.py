from leetcode.tree.binary_tree_level_order_traversal import Solution
from leetcode.tree.common.tree_node import array2tree


soln = Solution()


def test_case_1():
    tree = array2tree([3, 9, 20, None, None, 15, 7])

    assert soln.levelOrder(tree) == [[3], [9, 20], [15, 7]]


def test_case_2():
    tree = array2tree([1])

    assert soln.levelOrder(tree) == [[1]]


def test_case_3():
    tree = array2tree([])

    assert soln.levelOrder(tree) == []
