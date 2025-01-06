// DIFFICULTY: MEDIUM
//
// Given a list tasks and their dependencies ['A:B,C', 'B:D,C,E', 'F:G'], return a list of parallelizable tasks in
// order.  For example, in this situation [(D, C, E, F), (B, G), (A)] would be a valid order because all parallelizable
// tasks are grouped together.
//
// NOTE: This is not a LeetCode question but was asked by Cruise.
//
// See https://leetcode.com/discuss/interview-question/353830/google-phone-screen-parallel-job-scheduling
describe('parallel job scheduling', () => {
  function parallelize(jobs: string[]): string[][] {
    const graph = new Map<string, string[]>();
    const reversed = new Map<string, string[]>();
    for (const job of jobs) {
      const parts = job.split(':');
      const node = parts[0];
      const children = parts[1].split(',');

      // Build up an adjacency list graph.
      graph.set(node, children);

      // We will also want a reverse mapping of child -> parent; this will become useful later.
      for (const child of children) {
        if (!graph.has(child)) {
          graph.set(child, []);
        }

        const parents = reversed.get(child) ?? [];
        parents.push(node);
        reversed.set(child, parents);
      }
    }

    const result: string[][] = [];

    // While we have nodes without dependencies, let's prune them from the graph.
    const frontier = new Set<string>();
    for (const [key, value] of graph) {
      if (value.length === 0) {
        frontier.add(key);
      }
    }

    while (frontier.size > 0) {
      const subresult = [...frontier];
      frontier.clear();

      for (const node of subresult) {
        graph.delete(node);

        // A deletion could have caused a different node to become a leaf.  To find them, let's get the reverse mapping
        // of node to parents and check each parent if that parent became a leaf.
        const parents = reversed.get(node) ?? [];
        for (const parent of parents) {
          if (!graph.has(parent)) {
            continue;
          }

          // Remove the node from the parent adjacency lists.
          let children = graph.get(parent) ?? [];
          children = children.filter(u => u !== node);
          graph.set(parent, children);

          // If any list became empty, it is now prunable.
          if (children.length === 0) {
            frontier.add(parent);
          }
        }
      }

      result.push(subresult);
    }

    return result;
  }

  test('parallel job scheduling - test case 1', async () => {
    const jobs = ['A:B,C', 'B:D,E,F'];

    expect(parallelize(jobs)).toMatchSnapshot();
  });

  test('parallel job scheduling - test case 2', async () => {
    const jobs = ['A:B,C', 'B:D,E', 'F:G'];

    expect(parallelize(jobs)).toMatchSnapshot();
  });
});
