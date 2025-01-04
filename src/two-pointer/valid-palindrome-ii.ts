// DIFFICULTY: Easy
//
// Given a string s, return true if the s can be palindrome after deleting at most one character from it.
//
// See {@link https://leetcode.com/problems/valid-palindrome-ii/}
export { validPalindrome };

// SOLUTION:
//
// Use the two pointer technique to check if the character from the left matches the character on the right.  If they
// do, just proceed as normal checking characters.
//
// If they do not match, we have one chance to check if deleting either the left character, or the right character,
// results in a palindrome (we can only delete one character).  To do this check, we only need to check a subset of
// the characters.
//
// COMPLEXITY:
//
// The outer loop runs in O(n) time; if the word is a palindrome, the inner loop will never be called, resulting in
// O(n) runtime.
//
// The inner loop from isPalindrome() will also run in O(n) time, and they will be called at most twice.
//
// This results in time complexity of O(n + 2 * n) = O(n).
function validPalindrome(s: string): boolean {
  // Check if a string is a palindrome starting using the supplied left/right pointers.
  function isPalindrome(left: number, right: number) {
    while (left < right) {
      if (s[left] !== s[right]) {
        return false;
      }

      left++;
      right--;
    }

    return true;
  }

  // Use left < right here because it's not necessary to check if the middle character matches itself.
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    // If characters match, proceed as normal.
    if (s[left] === s[right]) {
      left++;
      right--;
      continue;
    }

    // Characters didn't match; check if deleting/skipping the left character results in a palindrome.
    const isSkipLeftOk = isPalindrome(left + 1, right);

    // Characters didn't match; check if deleting/skipping the right character results in a palindrome.
    const isSkipRightOk = isPalindrome(left, right - 1);

    // If deleting either was okay, we still have a "valid" palindrome.
    return isSkipLeftOk || isSkipRightOk;
  }

  // We didn't skip any characters, so it is a palindrome.
  return true;
}
