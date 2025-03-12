import leetcode.binary_search.find_the_smallest_divisor_given_a_threshold as lc


soln = lc.Solution()


def test_case_1():
    assert soln.smallestDivisor([1, 2, 5, 9], 6) == 5
