from leetcode.recursion.generate_parentheses import Solution


soln = Solution()


def test_case_1():
    assert set(soln.generateParenthesis(2)) == set(["()()", "(())"])


def test_case_2(snapshot):
    snapshot.assert_match(soln.generateParenthesis(3))


def test_case_3(snapshot):
    snapshot.assert_match(soln.generateParenthesis(4))
