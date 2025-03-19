from leetcode.recursion.letter_combinations_phone_number import Solution


soln = Solution()


def test_case_1():
    assert soln.letterCombinations("") == []


def test_case_2():
    assert sorted(soln.letterCombinations("2")) == ["a", "b", "c"]


def test_case_3():
    assert sorted(soln.letterCombinations("23")) == ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]
