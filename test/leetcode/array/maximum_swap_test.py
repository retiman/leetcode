import leetcode.array.maximum_swap as lc


soln = lc.Solution()


def test_case_1():
    assert soln.maximumSwap(2736) == 7236


def test_case_2():
    assert soln.maximumSwap(1993) == 9913


def test_case_3():
    assert soln.maximumSwap(98368) == 98863
