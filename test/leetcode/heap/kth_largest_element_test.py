from leetcode.heap.kth_largest_element import Solution


soln = Solution()


def test_case_1():
    assert soln.findKthLargest([3, 2, 1, 5, 6, 4], 2) == 5


def test_case_2():
    assert soln.findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4) == 4
