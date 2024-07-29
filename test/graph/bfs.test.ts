// DIFFICULTY: Medium
//
// General implementation for breadth first search.
//
// See https://leetcode.com/tag/breadth-first-search/
import { BreadthFirstSearch, Edge } from '../../src/graph/bfs';

describe('breadth first search', () => {
  test('breadth first search - test case 1', async () => {
    const graph: Edge[] = [
      ['a', 'b'],
      ['a', 'c'],
      ['a', 'e'],
      ['b', 'd'],
      ['b', 'f'],
      ['c', 'g']
    ];

    const result = new BreadthFirstSearch(graph).run();

    expect(result).toStrictEqual(['a', 'b', 'c', 'e', 'd', 'f', 'g']);
  });
});
