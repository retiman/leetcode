// DIFFICULTY: Easy
//
// Given a string s, return true if the s can be palindrome after deleting at most one character from it.
//
// See https://leetcode.com/problems/valid-palindrome-ii/
describe('valid palindrome ii', () => {
  // Use the two pointer technique to check if the character from the left matches the character on the right.  If they
  // do, just proceed as normal checking characters.
  //
  // If they do not match, we have one chance to check if deleting either the left character, or the right character,
  // results in a palindrome (we can only delete one character).  To do this check, we only need to check a subset of
  // the characters.
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

  test('valid palindrome ii - test case 1', async () => {
    expect(validPalindrome('aba')).toBe(true);
  });
});
