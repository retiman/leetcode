from leetcode.array.top_k_frequent_elements import Solution

soln = Solution()


def test_case_1():
    assert soln.topKFrequent([1, 1, 1, 2, 2, 3], 2) == [1, 2]
