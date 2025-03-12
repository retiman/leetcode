import leetcode.two_pointers.bag_of_tokens as lc


soln = lc.Solution()


def test_case_1():
    assert soln.bagOfTokensScore([100], 50) == 0


def test_case_2():
    assert soln.bagOfTokensScore([200, 100], 150) == 1


def test_case_3():
    assert soln.bagOfTokensScore([100, 200, 300, 400], 200) == 2
