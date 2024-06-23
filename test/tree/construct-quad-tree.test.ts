// DIFFICULTY: Hard
//
// Given a n * n matrix grid of 0's and 1's only. We want to represent grid with a Quad-Tree.
//
// Return the root of the Quad-Tree representing grid.
//
// See https://leetcode.com/problems/construct-quad-tree/
// See https://en.wikipedia.org/wiki/Quadtree
import { _Node } from '../../src/tree/construct-quad-tree';

describe('construct quad tree', () => {
  function construct(_grid: number[][]): _Node | null {
    return null;
  }

  function __serialize(node: _Node) {
    
  }

  test('test case 1', async () => {
    const grid = [
      [0, 1],
      [1, 0]
    ];
    expect(construct(grid)).toBeNull();
  });
});
