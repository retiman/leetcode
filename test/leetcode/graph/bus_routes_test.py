import json
import pathlib
from leetcode.graph.bus_routes import Solution


soln = Solution()


def test_case_1():
    assert soln.numBusesToDestination([[7, 12], [4, 5, 15], [6], [15, 19], [9, 12, 13]], 15, 12) == -1


def test_case_2():
    path = pathlib.Path(__file__).parent / "data" / "bus_routes.json"
    assert path.exists()
    with path.open("r", encoding="utf-8") as file:
        routes = json.load(file)
        assert soln.numBusesToDestination(routes, 0, 100000) == -1
