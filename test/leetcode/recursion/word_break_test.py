from leetcode.recursion.word_break_ii import Solution


soln = Solution()


def test_case_1():
    assert soln.wordBreak("catsanddog", ["cat", "cats", "and", "sand", "dog"]) == ["cat sand dog", "cats and dog"]


def test_case_2():
    assert soln.wordBreak("pineapplepenapple", ["apple", "pen", "applepen", "pine", "pineapple"]) == [
        "pine apple pen apple",
        "pine applepen apple",
        "pineapple pen apple",
    ]


def test_case_3():
    assert soln.wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]) == []
