import { maxOperations } from '../../src/recursion/maximum-number-of-operations-with-the-same-score';

describe('maximum number of operations with the same score', () => {
  test('max operations - test case 1', async () => {
    expect(maxOperations([3, 2, 1, 2, 3, 4])).toBe(3);
  });

  test('max operations - test case 2', async () => {
    expect(maxOperations([3, 2, 6, 1, 4])).toBe(2);
  });

  test('max operations - test case 3', async () => {
    expect(maxOperations([3, 2, 1, 4, 1])).toBe(2);
  });
});
