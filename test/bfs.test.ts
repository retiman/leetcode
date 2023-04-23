describe('breadth first search', () => {
  type Vertex = string;
  type Edge = [string, string];
  type Graph = Array<Edge>;

  class BreadthFirstSearch {
    private readonly adj: Map<Vertex, Set<Vertex>>;
    private readonly nodes: Array<string>;
    private readonly visited: Set<string>;
    private readonly result: Array<string>;

    constructor(graph: Array<Edge>) {
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
      const queue: Array<string> = [root];

      while (queue.length > 0) {
        const u = queue.shift();
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
      const adj: Map<Vertex, Set<Vertex>> = new Map();

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
    const graph: Array<Edge> = [
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
