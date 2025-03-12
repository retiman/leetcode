from leetcode.array.pascals_triangle import Solution

soln = Solution()


def test_case_1(snapshot):
    snapshot.assert_match(soln.generate(5))
