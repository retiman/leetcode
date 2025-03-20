from leetcode.prefix_sum.running_sum_of_1d_array import Solution


soln = Solution()


def test_case_1():
    assert soln.runningSum([1, 2, 3, 4]) == [1, 3, 6, 10]
