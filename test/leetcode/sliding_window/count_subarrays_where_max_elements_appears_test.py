import json
import pathlib
from leetcode.sliding_window.count_subarrays_where_max_element_appears import Solution


soln = Solution()


def test_case_1():
    assert soln.countSubarrays([1, 3, 2, 3, 3], 3) == 2


def test_case_2():
    assert soln.countSubarrays([1, 4, 2, 1], 3) == 0


def test_case_3():
    xs = [61, 23, 38, 23, 56, 40, 82, 56, 82, 82, 82, 70, 8, 69, 8, 7, 19, 14, 58, 42, 82, 10, 82, 78, 15, 82]
    k = 2

    assert soln.countSubarrays(xs, k) == 224


def test_case_4():
    path = pathlib.Path(__file__).parent / "data" / "count_subarrays_where_max_element_appears_test.json"
    assert path.exists()
    with path.open("r", encoding="utf-8") as file:
        xs = json.load(file)
        assert soln.countSubarrays(xs, 13) == 263559
