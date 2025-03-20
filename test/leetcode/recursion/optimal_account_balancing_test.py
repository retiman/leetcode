from leetcode.recursion.optimal_account_balancing import Solution


soln = Solution()


def test_case_1():
    assert soln.minTransfers([[0, 1, 10], [2, 0, 5]]) == 2


def test_case_2():
    assert soln.minTransfers([[0, 1, 10], [1, 0, 1], [1, 2, 5], [2, 0, 5]]) == 1


def test_case_3():
    assert soln.minTransfers([[0, 1, 1], [1, 2, 1], [2, 3, 4], [3, 4, 5]]) == 3
