import leetcode.dynamic_programming.max_subarray as lc


soln = lc.Solution()


def test_case_1():
    assert soln.maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]) == 6
