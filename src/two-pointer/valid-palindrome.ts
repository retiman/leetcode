// DIFFICULTY: Easy
//
// A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all
// non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and
// numbers.
//
// Given a string s, return true if it is a palindrome, or false otherwise.
//
// See {@link https://leetcode.com/problems/valid-palindrome/}
export { isPalindrome };

// SOLUTION:
//
// Use the two pointer technique to compare elements from the ends of the array to see if you have a match.
//
// COMPLEXITY:
//
// Runs in O(n) time.
function isPalindrome(s: string): boolean {
  // Replace all non-alphanumeric characters with an empty string.
  const text = s.replace(/[^a-zA-Z0-9]/g, '');

  // Use the two pointer technique to check if we have a palindrome.
  let left = 0;
  let right = text.length - 1;
  while (left < right) {
    if (text[left].toUpperCase() !== text[right].toUpperCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}
