from leetcode.sliding_window.best_time_to_buy_and_sell_stock import Solution


soln = Solution()


def test_case_1():
    assert soln.maxProfit([7, 1, 5, 3, 6, 4]) == 5


def test_case_2():
    assert soln.maxProfit([7, 6, 4, 3, 1]) == 0
