describe('depth first search', () => {
  type Vertex = string;
  type Edge = [string, string];
  type Graph = Edge[];

  class DepthFirstSearch {
    private readonly adj: Map<Vertex, Set<Vertex>>;

    private readonly nodes: string[];

    private readonly visited: Set<string>;

    private readonly preorder: string[];

    private readonly postorder: string[];

    constructor(graph: Edge[]) {
      this.adj = this.makeAdjacencyList(graph);
      this.nodes = [...this.adj.keys()];
      this.visited = new Set();
      this.preorder = [];
      this.postorder = [];
    }

    public run() {
      this.nodes.forEach(u => {
        this.runInternal(u);
      });
      return [this.preorder, this.postorder];
    }

    // The general strategy is to preorder visit the node, then recursively call this function on frontier nodes.
    // Finally postorder visit the node.
    private runInternal(u: string) {
      if (this.visited.has(u)) {
        return;
      }

      // Add the node to the visited list and start recording preorder.
      //
      // A preordering gives the order that nodes were DISCOVERED in.  As is, this will give a lexicographical ordering of
      // the elements (or a generalization of alphabetical order).
      this.visited.add(u);
      this.preorder.push(u);

      // Recursively visit the frontier nodes one by one.
      const frontier = this.adj.get(u);
      frontier?.forEach(v => {
        this.runInternal(v);
      });

      // A postordering gives the order that nodes were VISITED in.  As is, it's not that useful.  REVERSING this list
      // will give you a topological sort.
      this.postorder.push(u);
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
      ['c', 'g']
    ];

    const [preorder, postorder] = new DepthFirstSearch(graph).run();

    expect(preorder).toStrictEqual(['a', 'b', 'd', 'f', 'c', 'g', 'e']);
    expect(postorder).toStrictEqual(['d', 'f', 'b', 'g', 'c', 'e', 'a']);
  });
});
