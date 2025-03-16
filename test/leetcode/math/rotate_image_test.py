from leetcode.math.rotate_image import Solution


soln = Solution()


def test_case_1():
    matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

    soln.rotate(matrix)

    assert matrix == [[7, 4, 1], [8, 5, 2], [9, 6, 3]]
