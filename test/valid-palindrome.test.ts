// DIFFICULTY: Easy
//
// A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all
// non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and
// numbers.
//
// Given a string s, return true if it is a palindrome, or false otherwise.
//
// See https://leetcode.com/problems/valid-palindrome/
describe('valid palindrome', () => {
  function isPalindrome(s: string): boolean {
    const text = s.replace(/[^a-zA-Z0-9]/, '');

    let i = 0;
    let j = text.length - 1;

    while (i < j) {
      if (text[i].toUpperCase() !== text[j].toUpperCase()) {
        return false;
      }

      i++;
      j--;
    }

    return true;
  }

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
