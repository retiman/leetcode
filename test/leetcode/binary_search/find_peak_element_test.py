from leetcode.binary_search.find_peak_element import Solution


soln = Solution()


def test_case_1():
    assert soln.findPeakElement([1, 2, 3, 1]) == 2


def test_case_2():
    assert soln.findPeakElement([1, 2, 1, 3, 5, 6, 4]) == 5


def test_case_3():
    assert soln.findPeakElement([1]) == 0


def test_case_4():
    assert soln.findPeakElement([2, 1]) == 0


def test_case_5():
    assert soln.findPeakElement([-2147483647, -2147483648]) == 0


def test_case_6():
    assert soln.findPeakElement([1, 2]) == 1
