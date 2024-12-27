import { isPalindrome } from '../../src/two-pointer/valid-palindrome';

describe('valid palindrome', () => {
  test('valid palindrome - test case 1', async () => {
    expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true);
  });

  test('valid palindrome - test case 2', async () => {
    expect(isPalindrome('a')).toBe(true);
    expect(isPalindrome('aa')).toBe(true);
    expect(isPalindrome('aba')).toBe(true);
    expect(isPalindrome('ab')).toBe(false);
  });
});
