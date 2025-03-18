from leetcode.sliding_window.longest_continuous_subarray import Solution


soln = Solution()


def test_case_1():
    assert soln.longestSubarray([8, 2, 4, 7], 4) == 2


def test_case_2():
    assert soln.longestSubarray([10, 1, 2, 4, 7, 2], 5) == 4


def test_case_3():
    assert soln.longestSubarray([4, 2, 2, 2, 4, 4, 2, 2], 0) == 3


def test_case_4():
    assert soln.longestSubarray([1, 5, 6, 7, 8, 10, 6, 5, 6], 4) == 5
