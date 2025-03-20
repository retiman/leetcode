from leetcode.heap.task_scheduler import Solution


soln = Solution()


def test_case_1():
    # [A, B, _, A, B, _, A, B]
    assert soln.leastInterval(["A", "A", "A", "B", "B", "B"], 2) == 8


def test_case_2():
    # [A, B, A, B, C, D]
    assert soln.leastInterval(["A", "C", "A", "B", "D", "B"], 1) == 6


def test_case_3():
    # [A, B, _, _, A, B, _, _, A, B]
    # [A, _, _, _, A, _, _, _]
    assert soln.leastInterval(["A", "A", "A", "B", "B", "B"], 3) == 10
