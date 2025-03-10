import { checkSubarraySum } from '../../src/prefix-sum/continuous-subarray-sum';

describe('continuous subarray sum', () => {
  test('checkSubarraySum - test case 1', () => {
    expect(checkSubarraySum([23, 2, 4, 6, 7], 6)).toBe(true);
  });

  test('checkSubarraySum - test case 2', () => {
    expect(checkSubarraySum([1, 1], 2)).toBe(true);
  });

  test('checkSubarraySum - test case 3', () => {
    expect(checkSubarraySum([-10, 10], 1)).toBe(true);
  });
});
