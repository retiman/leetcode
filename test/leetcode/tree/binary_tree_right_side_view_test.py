from leetcode.tree.binary_tree_right_side_view import Solution
from leetcode.tree.common.tree_node import array2tree


soln = Solution()


def test_case_1():
    root = array2tree([1, 2, 3, None, 5, None, 4])

    assert soln.rightSideView(root) == [1, 3, 4]
