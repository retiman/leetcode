from leetcode.interval.merge_intervals import Solution


soln = Solution()


def test_case_1():
    intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]
    assert soln.merge(intervals) == [[1, 6], [8, 10], [15, 18]]
