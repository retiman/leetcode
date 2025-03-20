from leetcode.recursion.subsets import Solution


soln = Solution()


def test_case_1(snapshot):
    subsets = soln.subsets([1, 2, 3])

    subsets = {frozenset(subset) for subset in subsets}

    snapshot.assert_match(subsets)
