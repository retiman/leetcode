from leetcode.graph.smallest_greater_multiple_made_of_two_digits import Solution


soln = Solution()


def test_case_1():
    assert soln.findInteger(2, 0, 2) == 20


def test_case_2():
    assert soln.findInteger(3, 4, 2) == 24


def test_case_3():
    assert soln.findInteger(2, 0, 0) == -1
