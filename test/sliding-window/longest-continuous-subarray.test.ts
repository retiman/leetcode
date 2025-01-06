import { longestSubarray } from '../../src/sliding-window/longest-continuous-subarray';

describe('longest continuous subarray with absolute diff less than or equal to limit', () => {
  test('longest subarray - test case 1', async () => {
    expect(longestSubarray([8, 2, 4, 7], 4)).toBe(2);
  });

  test('longest subarray - test case 2', async () => {
    expect(longestSubarray([10, 1, 2, 4, 7, 2], 5)).toBe(4);
  });

  test('longest subarray - test case 3', async () => {
    expect(longestSubarray([4, 2, 2, 2, 4, 4, 2, 2], 0)).toBe(3);
  });

  test('longest subarray - test case 4', async () => {
    expect(longestSubarray([1, 5, 6, 7, 8, 10, 6, 5, 6], 4)).toBe(5);
  });
});
