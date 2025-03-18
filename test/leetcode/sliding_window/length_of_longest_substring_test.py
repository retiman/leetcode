from leetcode.sliding_window.length_of_longest_substring import Solution


soln = Solution()


def test_case_1():
    assert soln.lengthOfLongestSubstring("abcabcbb") == 3


def test_case_2():
    assert soln.lengthOfLongestSubstring("bbbbb") == 1


def test_case_3():
    assert soln.lengthOfLongestSubstring("pwwkew") == 3
