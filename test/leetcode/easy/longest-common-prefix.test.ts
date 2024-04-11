// CATEGORY: Two Pointer
//
// Write a function to find the longest common prefix string amongst an array of strings.
//
// If there is no common prefix, return an empty string "".
//
// See https://leetcode.com/problems/longest-common-prefix/
describe('longest common prefix', () => {
  function longestCommonPrefix(all: string[]): string {
    if (all.length === 0) {
      return '';
    }

    // Start by assuming the first string is the longest prefix; we'll update our assumptions as we go along.
    let prefix = all[0];
    for (let i = 1; i < all.length; i++) {
      const current = all[i];

      let j = 0;
      while (
        j < current.length &&
        // If the characters do not match at this index, then stop considering the rest.
        prefix[j] === current[j] &&
        // If the characters do match, but we've exceeded the current longest prefix length, there's no point in
        // checking the rest of the characters either.
        j < prefix.length
      ) {
        j += 1;
      }

      // Update our assumption about the longest common prefix.
      prefix = current.substring(0, j);
    }

    return prefix;
  }

  test('run', async () => {
    expect(longestCommonPrefix(['ab', 'a'])).toBe('a');
    expect(longestCommonPrefix(['a'])).toBe('a');
    expect(longestCommonPrefix(['flower', 'flow', 'flight'])).toBe('fl');
    expect(longestCommonPrefix(['dog', 'racecar', 'car'])).toBe('');
    expect(longestCommonPrefix(['', 'car'])).toBe('');
  });
});
