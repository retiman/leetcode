from leetcode.graph.word_search import Solution


soln = Solution()


def test_case_1():
    board = [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]]
    word = "ABCCED"

    assert soln.exist(board, word)
