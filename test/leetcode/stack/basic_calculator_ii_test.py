from leetcode.stack.basic_calculator_ii import Solution


soln = Solution()


def test_case_1():
    assert soln.calculate("3+2*2") == 7


def test_case_2():
    assert soln.calculate(" 3/2 ") == 1


def test_case_3():
    assert soln.calculate(" 3+5 / 2 ") == 5
