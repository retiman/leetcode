from leetcode.prefix_sum.product_of_array_except_self import Solution


soln = Solution()


def test_case_1():
    assert soln.productExceptSelf([1, 2, 3, 4]) == [24, 12, 8, 6]
