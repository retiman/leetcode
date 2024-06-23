// DIFFICULTY: Hard
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
// See https://leetcode.com/problems/bus-routes/
import fs from 'fs';
import path from 'path';

describe('bus routes', () => {
  type Bus = number;
  type Stop = number;
  type Item = { stop: number; result: number };

  // This seems to be just a BFS problem.  The fact that buses repeat forever doesn't seem to be relevant because there
  // is no cost associated with waiting at a bus stop until the bus arrives; the only thing we are minimizing is the
  // number of buses we want to take.
  //
  // Building a graph and then running BFS on it naively seems to exceed execution time so we'll have to do something
  // more clever and dirty.
  function numBusesToDestination(routes: number[][], source: number, target: number): number {
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

  // This is a simple, straightforward way to solve the problem, but exceeds execution time limits.
  function __simpleNumBusesToDestination(routes: number[][], source: number, target: number): number {
    if (source === target) {
      return 0;
    }

    // Build a graph of stop to bus number.  From there we can use the routing information to get a map of stop to
    // adjacent stops as well.
    const graph = __buildGraph(routes);

    // Initialize the queue for BFS.
    const visitedBuses = new Set<Bus>();
    const visitedStops = new Set<Stop>();
    const queue: Item[] = [];
    queue.push({
      stop: source,
      result: 0
    });

    // Now perform the BFS to see if we can reach the target.
    while (queue.length > 0) {
      const { stop, result } = queue.shift()!;
      if (stop === target) {
        return result;
      }

      // Find all the buses associated with this stop and determine the frontier stops.  Filter out any buses we have
      // already taken.
      const buses = graph.get(stop) ?? [];
      for (const bus of buses) {
        if (visitedBuses.has(bus)) {
          continue;
        }

        visitedBuses.add(bus);

        // Find all the stops associated with this bus and determine the frontier stops.  Filter out any stops we have
        // already taken.
        for (const next of routes[bus]) {
          if (visitedStops.has(next)) {
            continue;
          }

          queue.push({
            stop: next,
            result: result + 1
          });

          visitedStops.add(stop);
        }
      }
    }

    // If we've exhausted our BFS, this means the path to the target from the source is not possible.
    return -1;
  }

  function __buildGraph(routes: number[][]) {
    // Build a map of stop to buses; this is also a map of stops to routes since we have the route information for each
    // bus.
    const graph = new Map<Stop, Bus[]>();
    for (let i = 0; i < routes.length; i++) {
      const bus = i;
      const stops = routes[i];

      for (let j = 0; j < stops.length; j++) {
        const stop = stops[j];
        if (!graph.has(stop)) {
          graph.set(stop, []);
        }

        graph.get(stop)!.push(bus);
      }
    }

    return graph;
  }

  test('simple test case 1', async () => {
    const routes = [
      [1, 2, 7],
      [3, 6, 7]
    ];

    // We take the first bus to stop 7, then the second bus loops around to stop 6.  So total we take 2 buses.
    expect(__simpleNumBusesToDestination(routes, 1, 6)).toBe(2);
  });

  test('test case 1', async () => {
    const routes = [
      [1, 2, 7],
      [3, 6, 7]
    ];

    // We take the first bus to stop 7, then the second bus loops around to stop 6.  So total we take 2 buses.
    expect(numBusesToDestination(routes, 1, 6)).toBe(2);
  });

  test('test case 2', async () => {
    const routes = [[7, 12], [4, 5, 15], [6], [15, 19], [9, 12, 13]];

    expect(numBusesToDestination(routes, 15, 12)).toBe(-1);
  });

  test('test case 3', async () => {
    const data = fs.readFileSync(path.join(__dirname, '__data__', 'bus-routes.test.json')).toString();
    const routes = JSON.parse(data);

    expect(numBusesToDestination(routes, 0, 100000)).toBe(-1);
  });
});
