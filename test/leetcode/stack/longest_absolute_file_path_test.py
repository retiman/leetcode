from leetcode.stack.longest_absolute_file_path import Solution


soln = Solution()


def test_case_1():
    assert soln.lengthLongestPath("dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext") == 20


def test_case_2():
    assert soln.lengthLongestPath("dir\n    file.txt") == 12
