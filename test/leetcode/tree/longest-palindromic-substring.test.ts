import { longestPalindrome } from '../../src/string/longest-palindromic-substring';

describe('longest palindromic substring', () => {
  test('longestPalindrome - test case 1', () => {
    expect(longestPalindrome('babad')).toEqual('bab');
  });
});
