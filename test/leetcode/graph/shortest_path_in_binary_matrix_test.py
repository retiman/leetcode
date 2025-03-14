from leetcode.graph.shortest_path_in_binary_matrix import Solution


soln = Solution()


def test_case_1():
    grid = [[0, 1], [1, 0]]

    assert soln.shortestPathBinaryMatrix(grid) == 2


def test_case_2():
    grid = [
        [0, 1, 1, 0, 0, 0],
        [0, 1, 0, 1, 1, 0],
        [0, 1, 1, 0, 1, 0],
        [0, 0, 0, 1, 1, 0],
        [1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 0],
    ]

    assert soln.shortestPathBinaryMatrix(grid) == 14
