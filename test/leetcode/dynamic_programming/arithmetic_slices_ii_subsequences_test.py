from leetcode.dynamic_programming.arithmetic_slices_ii_subsequences import Solution

soln = Solution()


def test_case_1():
    assert soln.numberOfArithmeticSlices([2, 4, 6, 8, 10]) == 7


def test_case_2():
    assert soln.numberOfArithmeticSlices([7, 7, 7, 7, 7]) == 16
