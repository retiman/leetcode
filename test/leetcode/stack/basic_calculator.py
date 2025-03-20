from leetcode.stack.basic_calculator import Solution


soln = Solution()


def test_case_1():
    assert soln.calculate("1 + 1") == 2


def test_case_2():
    assert soln.calculate(" 2-1 + 2 ") == 3


def test_case_3():
    assert soln.calculate("(1+(4+5+2)-3)+(6+8)") == 23
