from leetcode.binary_search.find_first_and_last_position_of_element_in_sorted_array import \
    Solution

soln = Solution()


def test_case_1():
    assert soln.searchRange([5, 7, 7, 8, 8, 10], 8) == [3, 4]
