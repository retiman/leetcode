from leetcode.sliding_window.minimum_window_substring import Solution


soln = Solution()


def test_case_1():
    assert soln.minWindow("ADOBECODEBANC", "ABC") == "BANC"


def test_case_2():
    assert soln.minWindow("a", "a") == "a"
