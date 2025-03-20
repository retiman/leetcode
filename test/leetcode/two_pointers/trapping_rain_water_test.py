from leetcode.two_pointers.trapping_rain_water import Solution


soln = Solution()


def test_case_1():
    assert soln.trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]) == 6


def test_case_2():
    assert soln.trap([4, 2, 0, 3, 2, 5]) == 9


def test_case_3():
    assert soln.trap([4, 2, 3]) == 1
