# DIFFICULTY: HARD
# ----------------
#
# You are given an array routes representing bus routes where routes[i] is a bus route that the ith bus repeats
# forever.
#
# For example, if routes[0] = [1, 5, 7], this means that the 0th bus travels in the sequence:
#
# 1 -> 5 -> 7 -> 1 -> 5 -> 7 -> 1 -> ...
#
# ...forever.
#
# You will start at the bus stop source (You are not on any bus initially), and you want to go to the bus stop target.
# You can travel between bus stops by buses only.
#
# Return the least number of buses you must take to travel from source to target. Return -1 if it is not possible.
#
# See https://leetcode.com/problems/bus-routes
class Solution:
    def numBusesToDestination(self, routes: list[list[int]], source: int, target: int) -> int:
        """
        SOLUTION
        --------

        This seems to be just a BFS problem.  The fact that buses repeat forever doesn't seem to be relevant because
        there is no cost associated with waiting at a bus stop until the bus arrives; the only thing we are minimizing
        is the number of buses we want to take.

        Building a graph and then running BFS on it naively seems to exceed execution time so we'll have to do something
        more clever and dirty.

        COMPLEXITY
        ----------

        Time complexity is O(n * m) where n is the number of bus routes, and m is the number of stops per route.

        Space complexity is O(n * m).
        """
        if source == target:
            return 0

        # Once no more stops are added, break out of the loop.
        added = True

        # The number of buses we've taken so far.
        result = 0

        # Run a BFS from the source stop.  We'll iterate through the routes and add stops to the visited set until we
        # can no longer do so.  If we haven't found our target stop by then we'll return -1.
        visited: set[int] = set()
        visited.add(source)

        while added:
            # These are all routes that are reachable from currently visited stops, represented as individual stops in
            # the route.
            stops: list[int] = []
            added = False
            result += 1

            for i, route in enumerate(routes):
                for stop in route:
                    if stop in visited:
                        # Collect all stops in the route associated with the current stop.
                        stops.extend(route)

                        # We just added all the stops in the route, and we are about to mark them all as visited.  Clear
                        # the routes array at i because we do not have to visit them again, so there's no need to
                        # iterate through them anymore.
                        routes[i] = []

                        # We've found new stops to visit; break out of the (inner) loop and move onto the next route.
                        # We'll note that stops have been visited, so we should continue the outer while loop.
                        added = True
                        break

            # Mark all the stops we've seen in this iteration as visited.
            for stop in stops:
                visited.add(stop)

            # Immediately return if we have ended up visiting our target destination.
            if target in visited:
                return result

        return -1
