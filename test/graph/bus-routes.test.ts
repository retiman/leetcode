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
describe('bus routes', () => {
  // This seems to be just a BFS problem.  The fact that buses repeat forever doesn't seem to be relevant because there
  // is no cost associated with waiting at a bus stop until the bus arrives; the only thing we are minimizing is the
  // number of buses we want to take.
  function numBusesToDestination(routes: number[][], source: number, target: number): number {
    if (source === target) {
      return 0;
    }

    // Build a map of stop to buses; this is also a map of stops to routes since we have the route information for each
    // bus.
    type Stop = number;
    type Bus = number;
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

    // Perform BFS on the graph, starting at source, and see if we eventually hit the target.  We'll have a queue item
    // hold the bus number, but also the total number of buses we've taken to get to that one.
    type Item = { bus: number; total: number };
    const visited = new Set<number>();
    const queue: Item[] = [];

    // Initially, we are at the source, so all the buses that could be there go onto the queue.  We initialize the first
    // bus at one stop, because we've taken one bus to get to that stop.
    const buses = graph.get(source)!;
    for (let i = 0; i < buses.length; i++) {
      const bus = buses[i];
      queue.push({
        bus,
        total: 1
      });
    }

    while (queue.length > 0) {
      const { bus, total } = queue.shift()!;
      if (visited.has(bus)) {
        continue;
      }

      visited.add(bus);
      const frontier = routes[bus];
      if (frontier.findIndex(e => e === target) !== -1) {
        return total;
      }

      // Convert the frontier stops to buses, and continue the search.
      frontier.forEach(stop => {
        const next = graph.get(stop) ?? [];
        const items = next.map(b => ({
          bus: b,
          total: total + 1
        }));
        queue.push(...items);
      });
    }

    // If we've exhausted our BFS, this means the path to the target from the source is not possible.
    return -1;
  }

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
});
