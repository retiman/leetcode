// DIFFICULTY: HARD
//
// You are given an array routes representing bus routes where routes[i] is a bus route that the ith bus repeats
// forever.
//
// For example, if routes[0] = [1, 5, 7], this means that the 0th bus travels in the sequence:
//
// 1 -> 5 -> 7 -> 1 -> 5 -> 7 -> 1 -> ...
//
// ...forever.
//
// You will start at the bus stop source (You are not on any bus initially), and you want to go to the bus stop target.
// You can travel between bus stops by buses only.
//
// Return the least number of buses you must take to travel from source to target. Return -1 if it is not possible.
//
// See {@link https://leetcode.com/problems/bus-routes/}
export { numBusesToDestination };

// SOLUTION:
//
// This seems to be just a BFS problem.  The fact that buses repeat forever doesn't seem to be relevant because there
// is no cost associated with waiting at a bus stop until the bus arrives; the only thing we are minimizing is the
// number of buses we want to take.
//
// Building a graph and then running BFS on it naively seems to exceed execution time so we'll have to do something
// more clever and dirty.
function numBusesToDestination(routes: number[][], source: number, target: number): number {
  type Stop = number;

  if (source === target) {
    return 0;
  }

  // Once no more stops are added, break out of the loop.
  let added = true;

  // The number of buses we've taken so far.
  let result = 0;

  // Run a BFS from the source stop.  We'll iterate through the routes and add stops to the visited set until we can
  // no longer do so.  If we haven't found our target stop by then we'll return -1.
  const visited = new Set<Stop>();
  visited.add(source);
  while (added) {
    // These are all routes that are reachable from currently visited stops, represented as individual stops in the
    // route.
    const temp: Stop[] = [];
    added = false;
    result++;

    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];

      for (let j = 0; j < route.length; j++) {
        const stop = route[j];

        if (visited.has(stop)) {
          // Collect all stops in the route associated with the current stop.
          temp.push(...route);

          // We just added all the stops in the route, and we are about to mark them all as visited.  Clear the routes
          // array at i because we do not have to visit them again, so there's no need to iterate through them
          // anymore.
          routes[i] = [];

          // We've found new stops to visit; break out of the (inner) loop and move onto the next route.  We'll note
          // that stops have been visited, so we should continue the outer while loop.
          added = true;
          break;
        }
      }
    }

    // Mark all the stops we've seen in this iteration as visited.
    temp.forEach(stop => visited.add(stop));

    // Immediately return if we have ended up visiting our target destination.
    if (visited.has(target)) {
      return result;
    }
  }

  return -1;
}
