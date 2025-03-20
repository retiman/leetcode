from leetcode.stack.minimum_add_to_make_valid_parentheses import Solution


soln = Solution()


def test_case_1():
    assert soln.minAddToMakeValid("())") == 1


def test_case_2():
    assert soln.minAddToMakeValid("(((") == 3
