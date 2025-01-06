import { lengthOfLongestSubstring } from '../../src/two-pointer/longest-substring-without-repeating-chars';

describe('length of longest substring without repeated characters', () => {
  test('length of longest substring - test case 1', async () => {
    expect(lengthOfLongestSubstring('abcabcbb')).toBe(3);
  });

  test('length of longest substring - test case 2', async () => {
    expect(lengthOfLongestSubstring('bbbbb')).toBe(1);
  });

  test('length of longest substring - test case 3', async () => {
    expect(lengthOfLongestSubstring('pwwkew')).toBe(3);
  });
});
