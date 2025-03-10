// DIFFICULTY: EASY
//
// Given an integer x, return true if x is a palindrome, and false otherwise.
//
// See {@link https://leetcode.com/problems/palindrome-number/}
export { isPalindrome };

// SOLUTION:
function isPalindrome(x: number): boolean {
  const s = x.toString();
  const r = s.split('').reverse().join('');
  return s === r;
}
