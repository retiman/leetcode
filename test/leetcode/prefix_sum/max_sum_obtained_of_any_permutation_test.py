from leetcode.prefix_sum.max_sum_obtained_of_any_permutation import Solution


soln = Solution()


def test_case_1():
    assert soln.maxSumRangeQuery([1, 2, 3, 4, 5], [[1, 3], [0, 1]]) == 19
