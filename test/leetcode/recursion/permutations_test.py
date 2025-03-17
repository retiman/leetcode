from leetcode.recursion.permutations import Solution


soln = Solution()


def test_case_1():
    assert soln.permute([1, 2, 3]) == [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]


def test_case_2():
    assert soln.permute([0, 1]) == [[0, 1], [1, 0]]


def test_case_3():
    assert soln.permute([1]) == [[1]]


def test_case_4():
    assert soln.permute([]) == []
