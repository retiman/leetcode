from leetcode.array.design_hit_counter import HitCounter


hc = HitCounter()


def test_case_1():
    hc.hit(1)
    hc.hit(2)
    hc.hit(3)

    assert hc.getHits(4) == 3

    hc.hit(300)

    assert hc.getHits(300) == 4
    assert hc.getHits(301) == 3
