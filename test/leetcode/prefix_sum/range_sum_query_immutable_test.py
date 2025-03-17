from leetcode.prefix_sum.range_sum_query_immutable import NumArray


def test_case_1():
    arr = NumArray([-2, 0, 3, -5, 2, -1])
    assert arr.sumRange(0, 2) == 1
    assert arr.sumRange(2, 5) == -1
    assert arr.sumRange(0, 5) == -3
    assert arr.sumRange(0, 0) == -2
