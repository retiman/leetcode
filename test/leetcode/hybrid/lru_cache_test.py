from leetcode.hybrid.lru_cache import LRUCache


def test_case_1():
    cache = LRUCache(2)

    cache.put(1, 1)
    cache.put(2, 2)

    assert cache.get(1) == 1

    cache.put(3, 3)

    assert cache.get(2) == -1

    cache.put(4, 4)

    assert cache.get(1) == -1
    assert cache.get(3) == 3
    assert cache.get(4) == 4


def test_case_2():
    cache = LRUCache(2)

    assert cache.get(2) == -1
    assert cache.get(2) == -1

    cache.put(2, 6)

    assert cache.get(1) == -1

    cache.put(1, 5)
    cache.put(1, 2)

    assert cache.get(1) == 2
    assert cache.get(2) == 6


def test_case_3():
    cache = LRUCache(3)

    cache.put(1, 1)
    cache.put(2, 2)
    cache.put(3, 3)
    cache.put(4, 4)

    assert cache.get(4) == 4
    assert cache.get(3) == 3
    assert cache.get(2) == 2
    assert cache.get(1) == -1

    cache.put(5, 5)

    assert cache.get(1) == -1
    assert cache.get(2) == 2
    assert cache.get(3) == 3
    assert cache.get(4) == -1
    assert cache.get(5) == 5
