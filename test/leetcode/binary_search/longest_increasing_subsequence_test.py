from leetcode.binary_search.longest_increasing_subsequence import Solution

soln = Solution()


def test_case_1():
    assert soln.lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]) == 4
