// Breadth first search can be used to solve a variety of problems.
//
// The level order traversal of a binary search tree is essentially BFS.
//
// See https://leetcode.com/problems/binary-tree-level-order-traversal/
describe('breadth first search', () => {
  type Vertex = string;
  type Edge = [string, string];
  type Graph = Edge[];

  class BreadthFirstSearch {
    private readonly adj: Map<Vertex, Set<Vertex>>;

    private readonly nodes: string[];

    private readonly visited: Set<string>;

    private readonly result: string[];

    constructor(graph: Edge[]) {
      this.adj = this.makeAdjacencyList(graph);
      this.nodes = [...this.adj.keys()];
      this.visited = new Set();
      this.result = [];
    }

    public run() {
      if (this.adj.size === 0) {
        return [];
      }

      const root = this.nodes[0];
      const queue: string[] = [root];

      while (queue.length > 0) {
        // Because the queue is non-empty, the shift() function cannot return undefined, but apparently Typescript does
        // not know that.
        const u = queue.shift() as string;
        if (this.visited.has(u)) {
          continue;
        }

        // Visit the node and add it to the result list.
        this.visited.add(u);
        this.result.push(u);

        // Get the frontier nodes and add them to the queue.
        const frontier = this.adj.get(u) ?? [];
        queue.push(...frontier);
      }

      return this.result;
    }

    private makeAdjacencyList(graph: Graph) {
      const adj = new Map<Vertex, Set<Vertex>>();

      graph.forEach(([u, v]) => {
        const us = adj.get(u) ?? new Set();
        us.add(v);
        adj.set(u, us);

        const vs = adj.get(v) ?? new Set();
        vs.add(u);
        adj.set(v, vs);
      });

      return adj;
    }
  }

  test('run', async () => {
    const graph: Edge[] = [
      ['a', 'b'],
      ['a', 'c'],
      ['a', 'e'],
      ['b', 'd'],
      ['b', 'f'],
      ['c', 'g'],
    ];

    const result = new BreadthFirstSearch(graph).run();

    expect(result).toStrictEqual(['a', 'b', 'c', 'e', 'd', 'f', 'g']);
  });
});
