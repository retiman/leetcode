// DIFFICULTY: Medium
//
// General implementation for depth first search.
//
// See https://leetcode.com/tag/depth-first-search/
import { DepthFirstSearch, Edge } from '../../src/graph/dfs';

describe('depth first search', () => {
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
