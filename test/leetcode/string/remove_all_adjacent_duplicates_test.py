from leetcode.string.remove_all_adjacent_duplicates import Solution


soln = Solution()


def test_case_1():
    assert soln.removeDuplicates("abbaca") == "ca"
