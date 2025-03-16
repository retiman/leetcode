from leetcode.math.sequential_digits import Solution


soln = Solution()


def test_case_1(snapshot):
    snapshot.assert_match(soln.sequentialDigits(100, 300))


def test_case_2(snapshot):
    snapshot.assert_match(soln.sequentialDigits(1000, 13000))
