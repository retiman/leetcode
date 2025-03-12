import leetcode.array.two_sum as lc


soln = lc.Solution()


def test_case_1():
    assert soln.twoSum([2, 7, 11, 15], 9) == [1, 0]


def test_case_2():
    assert soln.twoSum([3, 2, 4], 6) == [2, 1]


def test_case_3():
    assert soln.twoSum([3, 3], 6) == [1, 0]
