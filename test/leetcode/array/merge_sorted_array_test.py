import leetcode.array.merge_sorted_array as lc


soln = lc.Solution()


def test_case_1():
    xs = [1, 2, 3, 0, 0, 0]
    m = 3
    ys = [2, 5, 6]
    n = 3

    soln.merge(xs, m, ys, n)

    assert xs == [1, 2, 2, 3, 5, 6]


def test_case_2():
    xs = [4, 5, 6, 0, 0, 0]
    m = 3
    ys = [1, 2, 3]
    n = 3

    soln.merge(xs, m, ys, n)

    assert xs == [1, 2, 3, 4, 5, 6]
