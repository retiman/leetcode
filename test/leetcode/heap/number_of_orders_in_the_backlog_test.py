import leetcode.heap.number_of_orders_in_the_backlog as lc


soln = lc.Solution()


def test_case_1():
    assert soln.getNumberOfBacklogOrders([[10, 5, 0], [15, 2, 1], [25, 1, 1], [30, 4, 0]]) == 6


def test_case_2():
    assert soln.getNumberOfBacklogOrders([[7, 1000000000, 1], [15, 3, 0], [5, 999999995, 0], [5, 1, 1]]) == 999999984


def test_case_3():
    assert soln.getNumberOfBacklogOrders([[19, 28, 0], [9, 4, 1], [25, 15, 1]]) == 39


def test_case_4():
    assert (
        soln.getNumberOfBacklogOrders(
            [[26, 7, 0], [16, 1, 1], [14, 20, 0], [23, 15, 1], [24, 26, 0], [19, 4, 1], [1, 1, 0]]
        )
        == 34
    )


def test_case_5():
    assert (
        soln.getNumberOfBacklogOrders(
            [
                [1, 29, 1],
                [22, 7, 1],
                [24, 1, 0],
                [25, 15, 1],
                [18, 8, 1],
                [8, 22, 0],
                [25, 15, 1],
                [30, 1, 1],
                [27, 30, 0],
            ]
        )
        == 22
    )
