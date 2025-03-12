from leetcode.heap.furthest_building_you_can_reach import Solution

soln = Solution()


def test_case_1():
    assert soln.furthestBuilding([4, 2, 7, 6, 9, 14, 12], 5, 1) == 4


def test_case_2():
    assert soln.furthestBuilding([4, 12, 2, 7, 3, 18, 20, 3, 19], 10, 2) == 7


def test_case_3():
    assert soln.furthestBuilding([14, 3, 19, 3], 17, 0) == 3
