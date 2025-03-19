from leetcode.string.integer_to_english_words import Solution


soln = Solution()


def test_case_1():
    assert soln.numberToWords(123) == "One Hundred Twenty Three"


def test_case_2():
    assert soln.numberToWords(12345) == "Twelve Thousand Three Hundred Forty Five"
