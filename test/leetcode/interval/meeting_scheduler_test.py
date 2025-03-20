from leetcode.interval.meeting_scheduler import Solution


soln = Solution()


def test_case_1():
    slot1 = [[10, 50], [60, 120], [140, 210]]
    slot2 = [[0, 15], [60, 70]]
    duration = 8

    assert soln.minAvailableDuration(slot1, slot2, duration) == [60, 68]
