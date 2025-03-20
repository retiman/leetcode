from leetcode.tree.common.tree_node import array2tree
from leetcode.tree.same_tree import Solution


soln = Solution()


def test_case_1():
    assert soln.isSameTree(None, None)


def test_case_2():
    p = array2tree([10, None, None])
    q = array2tree([10, None, None])

    assert soln.isSameTree(p, q)
