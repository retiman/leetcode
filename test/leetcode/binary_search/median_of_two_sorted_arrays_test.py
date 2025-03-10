from leetcode.binary_search.median_of_two_sorted_arrays import Solution


soln = Solution()


def test_case_1():
    assert soln.findMedianSortedArrays([1, 3], [2]) == 2


def test_case_2():
    assert soln.findMedianSortedArrays([3, 2, 3, 1, 2, 4, 5, 5, 6], [4]) == 3
