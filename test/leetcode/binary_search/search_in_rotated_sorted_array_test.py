from leetcode.binary_search.search_in_rotated_sorted_array import Solution


soln = Solution()


def test_case_1():
    assert soln.search([4, 5, 6, 7, 0, 1, 2], 0) == 4


def test_case_2():
    assert soln.search([4, 5, 6, 7, 0, 1, 2], 3) == -1


def test_case_3():
    assert soln.search([1], 0) == -1


def test_case_4():
    assert soln.search([3, 1], 1) == 1
