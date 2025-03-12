import leetcode.stack.valid_parentheses as lc


soln = lc.Solution()


def test_case_1():
    assert soln.isValid("()") is True


def test_case_2():
    assert soln.isValid("()[]{}") is True


def test_case_3():
    assert not soln.isValid("(}")
