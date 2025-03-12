from leetcode.string.valid_word_abbreviation import Solution


soln = Solution()


def test_case_1():
    assert soln.validWordAbbreviation("internationalization", "i12iz4n") is True


def test_case_2():
    assert soln.validWordAbbreviation("apple", "a2e") is False
