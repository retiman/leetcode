from leetcode.linked_list.common.list_node import array2list, list2array
from leetcode.linked_list.merge_two_sorted_lists import Solution


soln = Solution()


def test_case_1():
    a = None
    b = None
    assert soln.mergeTwoLists(a, b) is None


def test_case_2():
    a = array2list([1])
    b = None

    assert list2array(soln.mergeTwoLists(a, b)) == [1]


def test_case_3():
    a = None
    b = array2list([1])

    assert list2array(soln.mergeTwoLists(a, b)) == [1]


def test_case_4():
    a = array2list([1])
    b = array2list([2])

    assert list2array(soln.mergeTwoLists(a, b)) == [1, 2]


def test_case_5():
    a = array2list([1, 2, 4])
    b = array2list([2, 3, 4])

    assert list2array(soln.mergeTwoLists(a, b)) == [1, 2, 2, 3, 4, 4]
