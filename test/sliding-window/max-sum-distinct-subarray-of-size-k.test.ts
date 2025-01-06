import { maximumSubarraySum } from '../../src/sliding-window/max-sum-distinct-subarray-of-size-k';

describe('max sum of distincts subarray with length k', () => {
  test('max subarray sum - test case 1', async () => {
    expect(maximumSubarraySum([1, 5, 4, 2, 9, 9, 9], 3)).toBe(15);
  });

  test('max subarray sum - test case 2', async () => {
    expect(maximumSubarraySum([4, 4, 4], 3)).toBe(0);
  });
});
