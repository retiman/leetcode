from leetcode.graph.common.nested_integer import NestedInteger
from leetcode.graph.nested_list_weighted_sum_ii import Solution


soln = Solution()


def test_case_1():
    assert soln.depthSumInverse([NestedInteger(10)]) == 10


def test_case_2():
    assert soln.depthSumInverse([NestedInteger(10), NestedInteger(20)]) == 30
