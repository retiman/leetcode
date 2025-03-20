from leetcode.tree.common.tree_node import array2tree
from leetcode.tree.range_sum_of_bst import Solution


soln = Solution()


def test_case_1():
    tree = array2tree([10, 5, 15, 3, 7, None, 18])

    assert soln.rangeSumBST(tree, 7, 15) == 32
