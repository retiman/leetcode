import leetcode.binary_search.kth_missing_positive_number as lc


soln = lc.Solution()


def test_case_1():
    assert soln.findKthPositive([2, 3, 4, 7, 11], 5) == 9


def test_case_2():
    assert soln.findKthPositive([1, 2, 3, 4], 2) == 6
