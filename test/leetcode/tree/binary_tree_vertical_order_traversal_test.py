from leetcode.tree.binary_tree_vertical_order_traversal import Solution
from leetcode.tree.common.tree_node import array2tree


soln = Solution()


def test_case_1():
    tree = array2tree([3, 9, 20, None, None, 15, 7])

    assert soln.verticalOrder(tree) == [[9], [3, 15], [20], [7]]
