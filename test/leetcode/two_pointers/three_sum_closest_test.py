from leetcode.two_pointers.three_sum_closest import Solution


soln = Solution()


def test_case_1():
    assert soln.threeSumClosest([-1, 2, 1, -4], 1) == 2


def test_case_2():
    assert soln.threeSumClosest([1, 1, 1, 0], -100) == 2
