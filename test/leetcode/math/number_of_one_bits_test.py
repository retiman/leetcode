from leetcode.math.number_of_one_bits import Solution


soln = Solution()


def test_case_1():
    # Because 11 = 0b1001
    assert soln.hammingWeight(11) == 3
