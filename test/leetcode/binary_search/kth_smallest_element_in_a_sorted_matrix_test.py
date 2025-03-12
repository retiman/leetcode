from leetcode.binary_search.kth_smallest_element_in_a_sorted_matrix import Solution

soln = Solution()


def test_case_1():
    matrix = [[1, 5, 9], [10, 11, 13], [12, 13, 15]]
    k = 8

    assert soln.kthSmallest(matrix, k) == 13
