from leetcode.stack.minimum_remove_to_make_valid_parentheses import Solution


soln = Solution()


def test_case_1():
    assert soln.minRemoveToMakeValid("lee(t(c)o)de)") == "lee(t(c)o)de"


def test_case_2():
    assert soln.minRemoveToMakeValid("a)b(c)d") == "ab(c)d"
