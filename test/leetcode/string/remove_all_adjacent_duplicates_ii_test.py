from leetcode.string.remove_all_adjacent_duplicates_ii import Solution


soln = Solution()


def test_case_1():
    assert soln.removeDuplicates("abcd", 2) == "abcd"


def test_case_2():
    assert soln.removeDuplicates("deeedbbcccbdaa", 3) == "aa"
