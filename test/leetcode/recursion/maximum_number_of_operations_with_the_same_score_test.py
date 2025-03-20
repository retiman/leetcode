from leetcode.recursion.maximum_number_of_operations_with_the_same_score import Solution


soln = Solution()


def test_case_1():
    assert soln.maxOperations([3, 2, 1, 2, 3, 4]) == 3


def test_case_2():
    assert soln.maxOperations([3, 2, 6, 1, 4]) == 2


def test_case_3():
    assert soln.maxOperations([3, 2, 1, 4, 1]) == 2
