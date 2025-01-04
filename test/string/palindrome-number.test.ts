import { isPalindrome } from '../../src/string/palindrome-number';

describe('palindrome-number', () => {
  test('palindrome number - test case 1', () => {
    expect(isPalindrome(121)).toBe(true);
  });
});
