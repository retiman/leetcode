from leetcode.graph.word_search_ii import Solution


soln = Solution()


def test_case_1(snapshot):
    board = [["o", "a", "a", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]]
    words = ["oath", "pea", "eat", "rain"]

    snapshot.assert_match(soln.findWords(board, words))


def test_case_2():
    board = [["a", "b"], ["c", "d"]]
    words = ["abcb"]

    assert soln.findWords(board, words) == []


def test_case_3():
    board = [["a", "a"]]
    words = ["aaa"]

    assert soln.findWords(board, words) == []


def test_case_4(snapshot):
    board = [["o", "a", "a", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]]
    words = ["oath", "pea", "eat", "rain", "hklf", "hf"]

    snapshot.assert_match(board, words)
