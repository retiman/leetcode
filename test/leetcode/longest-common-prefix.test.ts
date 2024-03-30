// Write a function to find the longest common prefix string amongst an array of strings.
//
// If there is no common prefix, return an empty string "".
//
// See https://leetcode.com/problems/longest-common-prefix/
describe('longest common prefix', () => {
  // This is a naive way of finding the longest common prefix; we can optimize it a bit by not scanning through the
  // string array twice for finding the longest string, but it does not improve the asymptotic running time.
  function longestCommonPrefix(all: string[]): string {
    if (all.length === 0) {
      return '';
    }

    // Start by finding the longest string.
    let longest = all[0];
    for (let i = 1; i < all.length; i++) {
      const current = all[i];
      if (current.length > longest.length) {
        longest = current;
      }
    }

    // Assume that the longest string is also the longest prefix; we'll update our assumptions as we look at the other
    // strings.
    let prefix = longest;
    for (let i = 1; i < all.length; i++) {
      // Check current string and see how much of the prefix matches; if we find a mismatching character, update the
      // prefix to be shorter.
      const current = all[i];
      for (let j = 0; j < current.length; j++) {
        if (prefix[j] !== current[j]) {
          prefix = current.substring(0, j);
          break;
        }
      }
    }

    return prefix;
  }

  test('run', async () => {
    expect(longestCommonPrefix(['flower', 'flow', 'flight'])).toBe('fl');
    expect(longestCommonPrefix(['dog', 'racecar', 'car'])).toBe('');
  });
});
