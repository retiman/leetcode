from leetcode.stack.simplify_path import Solution


soln = Solution()


def test_case_1():
    assert soln.simplifyPath("/home/") == "/home"


def test_case_2():
    assert soln.simplifyPath("/../") == "/"
