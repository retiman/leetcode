from leetcode.stack.max_chunks_to_make_sorted_ii import Solution


soln = Solution()


def test_case_1():
    assert soln.maxChunksToSorted([5, 4, 3, 2, 1]) == 1


def test_case_2():
    assert soln.maxChunksToSorted([2, 1, 3, 4, 4]) == 4
