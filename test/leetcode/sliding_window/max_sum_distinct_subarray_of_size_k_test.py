from leetcode.sliding_window.max_sum_distinct_subarray_of_size_k import Solution


soln = Solution()


def test_case_1():
    assert soln.maximumSubarraySum([1, 5, 4, 2, 9, 9, 9], 3) == 15


def test_case_2():
    assert soln.maximumSubarraySum([4, 4, 4], 3) == 0
