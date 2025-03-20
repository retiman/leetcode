from leetcode.two_pointers.container_with_most_water import Solution


soln = Solution()


def test_case_1():
    assert soln.maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]) == 49


def test_case_2():
    assert soln.maxArea([1, 1]) == 1
