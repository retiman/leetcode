import { numberOfArithmeticSlices } from '../../src/dynamic-programming/arithmetic-slices-ii-subsequences';

describe('arithmetic slices ii - subsequence', () => {
  test('arithmetic slices ii - subsequence - test case 1', async () => {
    const nums = [2, 4, 6, 8, 10];

    expect(numberOfArithmeticSlices(nums)).toBe(7);
  });

  test('arithmetic slices ii - subsequence - test case 2', async () => {
    const nums = [7, 7, 7, 7, 7];

    expect(numberOfArithmeticSlices(nums)).toBe(16);
  });
});
