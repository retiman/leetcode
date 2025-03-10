// DIFFICULTY: MEDIUM
//
// Given a string s, return the longest palindromic substring in s.
//
// See {@link https://leetcode.com/problems/longest-palindromic-substring/}
export { longestPalindrome };

// SOLUTION:
//
// The naive solution is to iterate through each character, then treat that character as the center of a palindrome,
// expanding outwards to check if the characters match.
//
// Note that for each character, we have to do two checks:
//
// 1. Check if there's a palindrome centered at i, for odd length palindromes.
// 2. Check if there's a palindrome centered at i and i + 1, for even length palindromes.
//
// There is a dynamic programming solution that can solve this problem in O(n^2) time and O(n^2) space.
//
// There is a more sophisticated algorithm called Manacher's algorithm that can solve this problem in O(n) time, but
// it's pretty complicated.
//
// COMPLEXITY:
//
// Each checkPalindrome() call is O(n) where n is the length of the string.  We call this function twice for each
// character in the string, so the total time complexity is O(n^2).
//
// The space complexity is O(1) because we only use a constant amount of space.
function longestPalindrome(s: string): string {
  let start = 0;
  let maxLength = 0;

  function checkPalindrome(left: number, right: number) {
    let matched = false;

    // Expand the left and right pointers outwards from the center.
    while (left >= 0 && right < s.length) {
      // If the characters match, expand the pointers.
      if (s[left] === s[right]) {
        left--;
        right++;
        matched = true;
      }
      // Otherwise, break out of the loop.
      else {
        break;
      }
    }

    // If we didn't match any characters, then there's no need to update the length of the longest palindrome.
    if (!matched) {
      return;
    }

    // When the while loop ends, s[left] !== s[right], which means they don't match.  Adjust them back to a valid
    // position.  If they didn't match, then there's no need to
    left++;
    right--;

    // The length of the palindrome we have is bounded by [left, right] inclusive.  To get the length of this range,
    // we need to do right - left + 1.
    const length = right - left + 1;
    if (right - left + 1 > maxLength) {
      start = left;
      maxLength = length;
    }
  }

  if (s.length === 0) {
    return '';
  }

  for (let i = 0; i < s.length; i++) {
    // Check if there's a palindrome centered at i.
    checkPalindrome(i, i);
    // Check if there's a palindrome centered at i and i + 1.
    checkPalindrome(i, i + 1); // Even-length palindrome
  }

  return s.substring(start, start + maxLength);
}
