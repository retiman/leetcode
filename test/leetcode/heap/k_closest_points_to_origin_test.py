import leetcode.heap.k_closest_points_to_origin as lc


soln = lc.Solution()


def test_case_1():
    assert soln.kClosest([[1, 3], [-2, 2]], 1) == [[-2, 2]]
