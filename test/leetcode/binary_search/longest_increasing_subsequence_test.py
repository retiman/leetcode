import leetcode.binary_search.longest_increasing_subsequence as lc


soln = lc.Solution()


def test_case_1():
    assert soln.lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]) == 4
