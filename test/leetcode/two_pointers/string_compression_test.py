from leetcode.two_pointers.string_compression import Solution


soln = Solution()


def test_case_1():
    cs = ["a", "a", "b", "b", "c", "c", "c"]

    count = soln.compress(cs)

    assert cs[0:count] == ["a", "2", "b", "2", "c", "3"]
