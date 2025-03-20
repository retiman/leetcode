from leetcode.matrix.valid_word_square import Solution


soln = Solution()


def test_case_1():
    assert soln.validWordSquare(["abcd", "bnrt", "crmy", "dtye"])


def test_case_2():
    assert soln.validWordSquare(["abcd", "bnrt", "crm", "dt"])
