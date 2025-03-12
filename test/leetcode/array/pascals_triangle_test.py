import leetcode.array.pascals_triangle as lc


soln = lc.Solution()


def test_case_1(snapshot):
    snapshot.assert_match(soln.generate(5))
