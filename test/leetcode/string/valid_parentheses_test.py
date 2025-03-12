from leetcode.stack.valid_parentheses import Solution

soln = Solution()


def test_case_1():
    assert soln.isValid("()") is True


def test_case_2():
    assert soln.isValid("()[]{}") is True


def test_case_3():
    assert not soln.isValid("(}")
