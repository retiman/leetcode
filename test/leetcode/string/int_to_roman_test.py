from leetcode.string.int_to_roman import Solution


soln = Solution()


def test_case_1():
    assert soln.intToRoman(3) == "III"


def test_case_2():
    assert soln.intToRoman(4) == "IV"


def test_case_3():
    assert soln.intToRoman(9) == "IX"
