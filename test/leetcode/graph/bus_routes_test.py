# from pathlib import Path
from leetcode.graph.bus_routes import Solution

soln = Solution()


def test_case_1():
    assert soln.numBusesToDestination([[7, 12], [4, 5, 15], [6], [15, 19], [9, 12, 13]], 15, 12) == -1


# def test_case_2():
#    with Path("leetcode/data/bus_routes.json").open("r") as file:
#        routes = json.loads(file)
#        assert soln.numBusesToDestination(routes, 0, 100000) == -1
