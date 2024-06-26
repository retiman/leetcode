// DIFFICULTY: Medium
//
// Given a string s, find the length of the longest substring without repeating characters.
//
// See https://leetcode.com/problems/longest-substring-without-repeating-characters
describe('length of longest substring without repeated characters', () => {
  // This can be solved using the sliding window technique by maintaining, always, a window where we have a substring
  // without repeating characters.
  //
  // To ensure we can check this constraint, we'll keep track of the last time we have seen a character, so we can move
  // the left pointer to the right of the left seen index and maintain our no-repeat constraint.
  //
  //  Once we move the left pointer just one step to the right of the last seen index, we'll update that seen index to
  // the rightmost position we've seen it, so we can leverage the map again next time.
  function lengthOfLongestSubstring(text: string): number {
    const seen = new Map<string, number>();

    // Use a sliding window approach by moving the right pointer along the string's characters, and updating the left
    // pointer any time we see a repeated character.
    let max = 0;
    for (let left = 0, right = 0; right < text.length; ) {
      const c = text[right];

      // If we've already seen this character, update the left pointer and move it just right of the last seen
      // occurrence to ensure no repeated characters.
      if (seen.has(c)) {
        const last = seen.get(c)!;
        left = Math.max(left, last + 1);
      }

      // Update our asumption about the current max.
      max = Math.max(max, right - left + 1);

      // Set the current character to be seen and advance the right pointer.
      seen.set(c, right);
      right++;
    }

    return max;
  }

  test('test case 1', async () => {
    expect(lengthOfLongestSubstring('abcabcbb')).toBe(3);
  });

  test('test case 2', async () => {
    expect(lengthOfLongestSubstring('bbbbb')).toBe(1);
  });

  test('test case 3', async () => {
    expect(lengthOfLongestSubstring('pwwkew')).toBe(3);
  });
});
