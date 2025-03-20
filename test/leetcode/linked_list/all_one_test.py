from leetcode.linked_list.all_one import AllOne


def test_case_1():
    allone = AllOne()
    allone.inc("hello")
    allone.inc("hello")

    assert allone.getMaxKey() == "hello"
    assert allone.getMinKey() == "hello"

    allone.inc("leet")

    assert allone.getMaxKey() == "hello"
    assert allone.getMinKey() == "leet"


def test_case_2():
    allone = AllOne()
    allone.inc("a")
    allone.inc("b")
    allone.inc("b")
    allone.inc("c")
    allone.inc("c")
    allone.inc("c")
    allone.dec("b")
    allone.dec("b")

    assert allone.getMinKey() == "a"

    allone.dec("a")

    assert allone.getMaxKey() == "c"
    assert allone.getMinKey() == "c"
