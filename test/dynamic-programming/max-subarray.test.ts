import { maxSubArray } from '../../src/dynamic-programming/max-subarray';

describe('maximum subarray', () => {
  test('maximum subarray - test case 1', async () => {
    expect(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6);
  });
});
