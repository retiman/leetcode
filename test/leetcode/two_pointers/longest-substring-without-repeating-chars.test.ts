import { lengthOfLongestSubstring } from '../../src/two-pointer/longest-substring-without-repeating-chars';

describe('longest substring without repeating characters', () => {
  test('length of longest substring - test case 4', async () => {
    expect(lengthOfLongestSubstring('abcabcbb')).toBe(3);
  });

  test('length of longest substring - test case 5', async () => {
    expect(lengthOfLongestSubstring('bbbbb')).toBe(1);
  });

  test('length of longest substring - test case 6', async () => {
    expect(lengthOfLongestSubstring('pwwkew')).toBe(3);
  });
});
