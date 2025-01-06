// DIFFICULTY: HARD
//
// There is an undirected graph consisting of n nodes numbered from 1 to n. You are given the integer n and a 2D array
// edges where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi. The graph can be disconnected.
//
// You can add at most two additional edges (possibly none) to this graph so that there are no repeated edges and no self-loops.
//
// Return true if it is possible to make the degree of each node in the graph even, otherwise return false.
//
// The degree of a node is the number of edges connected to it.
//
// See https://leetcode.com/problems/add-edges-to-make-degrees-of-all-nodes-even/
describe('add edges to make degrees of all nodes even', () => {
  // When you add an edge between two nodes, you change the degree of those two nodes.  We don't need to modify edges
  // for any even degree nodes; they are already good.  Instead we want to find nodes with an odd degree.
  //
  // If we join any two odd degree nodes with an edge, both of them will become even degree nodes.  Since we can only
  // add at most two edges, this can only be possible if we have 0, 2, or 4 nodes with an odd degree.
  function isPossible(n: number, edges: number[][]): boolean {
    type Node = number;
    type Degree = number;

    // Let's define an easy way to keep track of edges, because later, we may want to add edges to our graph without
    // adding duplicate edges.  Typescript sets can store arrays, [1, 2] is the same as [2, 1] in an undirected graph
    // so it's easier to just have a canonical string representation of an edge stored instead.
    const set = new Set<string>();
    function hasEdge(edge: number[]) {
      const [a, b] = edge;
      const value = a < b ? `${a},${b}` : `${b},${a}`;
      return set.has(value);
    }

    function addEdge(edge: number[]) {
      const [a, b] = edge;
      const value = a < b ? `${a},${b}` : `${b},${a}`;
      set.add(value);
    }

    // Find all the nodes with an odd degree.
    const degreeMap = new Map<Node, Degree>();
    for (const edge of edges) {
      const [u, v] = edge;
      if (!degreeMap.has(u)) {
        degreeMap.set(u, 0);
      }
      if (!degreeMap.has(v)) {
        degreeMap.set(v, 0);
      }

      degreeMap.set(u, degreeMap.get(u)! + 1);
      degreeMap.set(v, degreeMap.get(v)! + 1);
      addEdge([u, v]);
    }

    // Note that the nodes are numbered 1 through n inclusive.
    const oddNodes = [];
    for (let i = 1; i <= n; i++) {
      const degrees = degreeMap.get(i) ?? 0;
      if (degrees % 2 === 1) {
        oddNodes.push(i);
      }
    }

    // Only 0, 2, or 4 odd degree node graphs can be have edges added to create a valid all even degree graph.
    if (oddNodes.length === 0) {
      return true;
    }

    // If we have 2 odd degree nodes, we have to check if we can create an all even degree graph by doing one of the
    // following:
    //
    // 1. Add an edge between the two nodes, as long as it's not a duplicate.
    // 2. Add two edges connecting the nodes, with another node in between.
    if (oddNodes.length === 2) {
      const [a, b] = oddNodes;
      // Check if we can create an all even degree graph by connecting the nodes directly.
      if (!hasEdge([a, b])) {
        return true;
      }

      // Check if we can create an all even degree graph by connecting the nodes through a different node.  Note that
      // the nodes are numbered 1 through n inclusive.
      for (let c = 1; c <= n; c++) {
        if (c === a || c === b) {
          continue;
        }

        if (!hasEdge([a, c]) && !hasEdge([c, b])) {
          return true;
        }
      }

      return false;
    }

    // If we have 4 odd degree nodes, we can check if we can create an all even degree graph by connecting the nodes
    // together.  The nodes must be connected directly though; we can't connect them through some unrelated node as that
    // requires two edges already, leaving the other two odd degree nodes stranded.
    if (oddNodes.length === 4) {
      const [a, b, c, d] = oddNodes;

      // With 4 nodes, we can only connect them in 3 distinct ways.
      const pairs = [
        [
          [a, b],
          [c, d]
        ],
        [
          [a, c],
          [b, d]
        ],
        [
          [a, d],
          [c, b]
        ]
      ];
      for (const pair of pairs) {
        const [first, second] = pair;
        if (!hasEdge(first) && !hasEdge(second)) {
          return true;
        }
      }

      return false;
    }

    return false;
  }

  test('add edges to make degrees even - test case 1', async () => {
    const n = 5;
    const edges = [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 2],
      [1, 4],
      [2, 5]
    ];

    expect(isPossible(n, edges)).toBe(true);
  });

  test('add edges to make degrees even - test case 2', async () => {
    const n = 4;
    const edges = [
      [1, 2],
      [3, 4]
    ];

    expect(isPossible(n, edges)).toBe(true);
  });

  test('add edges to make degrees even - test case 3', async () => {
    const n = 4;
    const edges = [
      [1, 2],
      [1, 3],
      [1, 4]
    ];

    expect(isPossible(n, edges)).toBe(false);
  });

  test('add edges to make degrees even - test case 4', async () => {
    const n = 4;
    const edges = [
      [1, 2],
      [2, 3],
      [2, 4],
      [3, 4]
    ];

    expect(isPossible(n, edges)).toBe(false);
  });
});
