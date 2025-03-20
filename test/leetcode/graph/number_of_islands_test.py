from leetcode.graph.number_of_islands import Solution


soln = Solution()


def test_case_1():
    grid = [["1", "1", "1", "1", "0"], ["1", "1", "0", "1", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "0", "0", "0"]]

    assert soln.numIslands(grid) == 1
