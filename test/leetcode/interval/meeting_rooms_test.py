from leetcode.interval.meeting_rooms import Solution


soln = Solution()


def test_case_1():
    assert not soln.canAttendMeetings([[0, 30], [5, 10], [15, 20]])
