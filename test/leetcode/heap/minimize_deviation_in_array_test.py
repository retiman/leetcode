from leetcode.heap.minimize_deviation_in_array import Solution


soln = Solution()


def test_case_1():
    assert soln.minimumDeviation([1, 2, 3, 4]) == 1


def test_case_2():
    assert soln.minimumDeviation([4, 1, 5, 20, 3]) == 3


def test_case_3():
    assert soln.minimumDeviation([2, 10, 8]) == 3
