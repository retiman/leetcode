from leetcode.string.longest_palindromic_substring import Solution


soln = Solution()


def test_case_1():
    assert soln.longestPalindrome("babad") == "bab"


def test_case_2():
    assert soln.longestPalindrome("cbbd") == "bb"
