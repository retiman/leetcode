from leetcode.sliding_window.repeated_dna_sequences import Solution


soln = Solution()


def test_case_1():
    assert soln.findRepeatedDnaSequences("AAAAAAAAAAAAA") == ["AAAAAAAAAA"]


def test_case_2():
    assert soln.findRepeatedDnaSequences("AAAAAAAAAAA") == ["AAAAAAAAAA"]
