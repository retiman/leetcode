from leetcode.interval.interval_list_intersections import Solution


soln = Solution()


def test_case_1(snapshot):
    firstList = [[0, 2], [5, 10], [13, 23], [24, 25]]
    secondList = [[1, 5], [8, 12], [15, 24], [25, 26]]

    snapshot.assert_match(soln.intervalIntersection(firstList, secondList))
