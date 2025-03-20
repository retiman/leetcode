from leetcode.stack.key_value_store_nested_transactions import KeyValueStore


def test_case_1():
    store = KeyValueStore()

    # data: {a: 1, b: 2, c: 3}
    store.set("a", 1)
    store.set("b", 2)
    store.set("c", 3)

    assert store.get("a") == 1
    assert store.get("b") == 2
    assert store.get("c") == 3

    # data: {a: 1, b: 2}
    store.delete("c")

    assert not store.get("c")


def test_case_2():
    store = KeyValueStore()

    # data: {a: 1, b: 2, c: 3}
    store.set("a", 1)
    store.set("b", 2)
    store.set("c", 3)

    # data: {a: 1, b: 2, c: 3}
    # tx1: {a: 10, b: 20}
    store.begin()
    store.set("a", 10)
    store.set("b", 20)
    store.delete("c")

    assert store.get("a") == (10)
    assert store.get("b") == (20)
    assert not store.get("c")

    # data: {a: 10, b: 20}
    store.commit()

    assert store.get("a") == 10
    assert store.get("b") == 20


def test_case_3():
    store = KeyValueStore()

    # data: {a: 1, b: 2, c: 3}
    store.set("a", 1)
    store.set("b", 2)
    store.set("c", 3)

    # data: {a: 1, b: 2, c: 3}
    # tx1: {a: 10, b: 20}
    store.begin()
    store.set("a", 10)
    store.set("b", 20)
    store.delete("c")

    assert store.get("a") == 10
    assert store.get("b") == 20
    assert not store.get("c")

    # data: {a: 1, b: 2, c: 3}
    store.rollback()

    assert store.get("a") == 1
    assert store.get("b") == 2
    assert store.get("c") == 3


def test_case_4():
    store = KeyValueStore()

    # data: {a: 1}
    store.set("a", 1)

    # data: {a: 1}
    # tx1: {a: 10}
    store.begin()
    store.set("a", 10)

    # data: {a: 1}
    # tx1: {a: 10}
    # tx2: {a: 100}
    store.begin()
    store.set("a", 100)

    assert store.get("a") == 100

    # data: {a: 1}
    # tx1: {a: 100}
    store.commit()

    assert store.get("a") == 100

    # data: {a: 100}
    store.commit()

    assert store.get("a") == 100


def test_case_5():
    store = KeyValueStore()

    # data: {a: 1, b: 2}
    store.set("a", 1)
    store.set("b", 2)

    # data: {a: 1, b: 2}
    # tx1: {b: 20}
    store.begin()
    store.delete("a")
    store.set("b", 20)

    # data: {a: 1, b: 2}
    # tx1: {b: 20}
    # tx2: {a: 100}
    store.begin()
    store.set("a", 100)
    store.delete("b")

    assert store.get("a") == 100
    assert not store.get("b")

    # data: {a: 1, b: 2}
    # tx1: {b: 20}
    store.rollback()

    assert not store.get("a")
    assert store.get("b") == 20

    # data: {a: 1, b: 2}
    store.rollback()

    assert store.get("a") == 1
    assert store.get("b") == 2
