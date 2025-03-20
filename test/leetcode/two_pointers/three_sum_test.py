from leetcode.two_pointers.three_sum import Solution


soln = Solution()


def test_case_1():
    assert soln.threeSum([-1, 0, 1, 2, -1, -4]) == [[-1, -1, 2], [-1, 0, 1]]


def test_case_2():
    assert soln.threeSum([]) == []
