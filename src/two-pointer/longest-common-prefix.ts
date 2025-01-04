// DIFFICULTY: Easy
//
// Write a function to find the longest common prefix string amongst an array of strings.
//
// If there is no common prefix, return an empty string "".
//
// See {@link https://leetcode.com/problems/longest-common-prefix/}
export { longestCommonPrefix };

// SOLUTION:
//
// Note that the longest prefix can only be, at most, the length of the shortest string.  We can start with the first
// string as a guess for the longest prefix, then tighten the bounds of that guess as we look the other strings.
function longestCommonPrefix(all: string[]): string {
  if (all.length === 0) {
    return '';
  }

  // The longest prefix can be at most the length of the shortest string.  Therefore, we can set our best guess of
  // the longest prefix to the first string.  From there, we can tighten the bounds of the prefix and come up with an
  // even shorter string as a result.
  let longest = all[0];
  for (let i = 1; i < all.length; i++) {
    const current = all[i];

    // Compare the current string, character by character, against the longest prefix we've found so far.  The length
    // of matching characters will be used to update our assumption about the longest prefix afterwards.
    let j = 0;
    while (
      // If the characters at the current position DO NOT match, stop.  The longest prefix will become where we have
      // stopped.
      longest[j] === current[j] &&
      // If the characters at the current position DO match, but we exceeded the length of either the current string
      // or the longest prefix, we have to stop.  There are no more characters to compare against each other.
      j < Math.min(current.length, longest.length)
    ) {
      j += 1;
    }

    // The length j represents how many characters match between the current prefix and the longest string, so update
    // that value.
    longest = current.substring(0, j);
  }

  return longest;
}
