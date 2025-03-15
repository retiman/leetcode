from leetcode.linked_list.add_two_numbers import Solution
from leetcode.linked_list.common.list_node import array2list, list2array


soln = Solution()


def test_case_1():
    x = array2list([2, 4, 3])
    y = array2list([5, 6, 4])

    assert x
    assert y
    assert list2array(soln.addTwoNumbers(x, y)) == [7, 0, 8]


def test_case_2():
    x = array2list([9, 9, 9, 9, 9, 9, 9])
    y = array2list([9, 9, 9, 9])

    assert x
    assert y
    assert list2array(soln.addTwoNumbers(x, y)) == [8, 9, 9, 9, 0, 0, 0, 1]


def test_case_3(snapshot):
    x = array2list([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1])
    y = array2list([5, 6, 4])

    assert x
    assert y
    snapshot.assert_match(list2array(soln.addTwoNumbers(x, y)))
