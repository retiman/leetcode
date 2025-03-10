import { subarraySum } from '../../src/prefix-sum/subarray-sum-equals-k';

describe('subarray sum equals k', () => {
  test('subarray sum equals k', async () => {
    expect(subarraySum([1, 1, 1], 2)).toBe(2);
  });
});
