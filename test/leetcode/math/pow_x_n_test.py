from leetcode.math.pow_x_n import Solution


soln = Solution()


def test_case_1():
    assert soln.myPow(2, -2) == 0.25


def test_case_2():
    assert soln.myPow(2, -1) == 0.5


def test_case_3():
    assert soln.myPow(2, 0) == 1


def test_case_4():
    assert soln.myPow(2, 1) == 2


def test_case_5():
    assert soln.myPow(2, 4) == 16


def test_case_6():
    assert soln.myPow(2, 5) == 32


def test_case_7():
    assert soln.myPow(2, -2147483648) == 0
