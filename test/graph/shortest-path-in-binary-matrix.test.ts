import { shortestPathBinaryMatrix } from '../../src/graph/shortest-path-in-binary-matrix';

describe('shortest path in binary matrix', () => {
  test('shortest path in binary matrix - test case 1', async () => {
    const grid = [
      [0, 1],
      [1, 0]
    ];

    expect(shortestPathBinaryMatrix(grid)).toBe(2);
  });

  test('shortest path in binary matrix - test case 2', async () => {
    const grid = [
      [0, 1, 1, 0, 0, 0],
      [0, 1, 0, 1, 1, 0],
      [0, 1, 1, 0, 1, 0],
      [0, 0, 0, 1, 1, 0],
      [1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 0]
    ];

    expect(shortestPathBinaryMatrix(grid)).toBe(14);
  });
});
