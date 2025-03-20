from leetcode.prefix_sum.continuous_subarray_sum import Solution


soln = Solution()


def test_case_1():
    assert soln.checkSubarraySum([23, 2, 4, 6, 7], 6)


def test_case_2():
    assert soln.checkSubarraySum([1, 1], 2)


def test_case_3():
    assert soln.checkSubarraySum([-10, 10], 1)
