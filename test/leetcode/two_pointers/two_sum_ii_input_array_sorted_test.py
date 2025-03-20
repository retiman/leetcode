from leetcode.two_pointers.two_sum_ii_input_array_sorted import Solution


soln = Solution()


def test_case_1():
    assert soln.twoSum([2, 7, 11, 15], 9) == [1, 2]


def test_case_2():
    assert soln.twoSum([2, 3, 4], 6) == [1, 3]
