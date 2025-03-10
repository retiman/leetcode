import { isPossible } from '../../src/graph/add-edges-to-make-degrees-even';

describe('add edges to make degrees of all nodes even', () => {
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
