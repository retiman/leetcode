from leetcode.string.find_the_closest_palindrome import Solution


soln = Solution()


def test_case_1():
    assert soln.nearestPalindromic("1234") == "1221"


def test_case_2():
    assert soln.nearestPalindromic("123") == "121"


def test_case_3():
    assert soln.nearestPalindromic("1") == "0"


def test_case_4():
    assert soln.nearestPalindromic("10") == "9"


def test_case_5():
    assert soln.nearestPalindromic("11911") == "11811"


def test_case_6():
    assert soln.nearestPalindromic("100") == "99"


def test_case_7():
    assert soln.nearestPalindromic("11011") == "11111"


def test_case_8():
    assert soln.nearestPalindromic("111111111") == "111101111"


def test_case_9():
    assert soln.nearestPalindromic("19991") == "20002"
