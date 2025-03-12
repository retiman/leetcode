from leetcode.graph.add_edges_to_make_degrees_even import Solution

soln = Solution()


def test_case_1():
    n = 5
    edges = [[1, 2], [2, 3], [3, 4], [4, 2], [1, 4], [2, 5]]

    assert soln.isPossible(n, edges)


def test_case_2():
    n = 4
    edges = [[1, 2], [3, 4]]

    assert soln.isPossible(n, edges)


def test_case_3():
    n = 4
    edges = [[1, 2], [1, 3], [1, 4]]

    assert not soln.isPossible(n, edges)


def test_case_4():
    n = 4
    edges = [[1, 2], [2, 3], [2, 4], [3, 4]]

    assert not soln.isPossible(n, edges)
