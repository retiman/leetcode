import { minTransfers } from '../../src/recursion/optimal-account-balancing';

describe('optimal account balancing', () => {
  test('min transfers - test case 1', async () => {
    expect(
      minTransfers([
        [0, 1, 10],
        [2, 0, 5]
      ])
    ).toBe(2);
  });

  test('min transfers - test case 2', async () => {
    expect(
      minTransfers([
        [0, 1, 10],
        [1, 0, 1],
        [1, 2, 5],
        [2, 0, 5]
      ])
    ).toBe(1);
  });

  test('min transfers - test case 3', async () => {
    expect(
      minTransfers([
        [0, 1, 1],
        [1, 2, 1],
        [2, 3, 4],
        [3, 4, 5]
      ])
    ).toBe(3);
  });
});
