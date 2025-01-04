// DIFFICULTY: Medium
//
// Given a string s, find the length of the longest substring without repeating characters.
//
// See {@link https://leetcode.com/problems/longest-substring-without-repeating-characters/}
export { lengthOfLongestSubstring };

// SOLUTION:
//
// The naive way of doing this problem would be to generate all substrings, then check if each of the substrings has
// unique characters, updating a max length as we go along.
//
// However, we can do better than that using the two pointer technique.
//
// Since we only need to know the length of the substring, and not exactly what it is, we don't need to build up the
// string as we loop through the characters.
//
// Instead, we'll maintain a map of character -> index, where the index is the time where we most recently encountered
// that character.  We'll use that index, along with the current index, to update our knowledge of what the max length
// substring is.
function lengthOfLongestSubstring(text: string): number {
  // Use start as the index of the current substring under consideration.
  let start = 0;
  let max = 0;
  const map = new Map<string, number>();

  for (let i = 0; i < text.length; i++) {
    const c = text.charAt(i);

    // If we've seen this character before, we'll have to update our start index.  This is because our substring can't
    // have repeated characters any repeat character forces us to update start value.
    if (map.has(c)) {
      const j = map.get(c)!;
      // It's possible we saw this character a while ago, and our current start index is more accurate.  In that case
      // the case, leave start alone.
      if (start <= j) {
        // In the case that we need to refresh the start index, set it past the index of the last seen instance of
        // this character (since we are seeing this character now).
        start = j + 1;
      }
    }

    // Consider the current index as the possible end of a substring.  If this substring has a longer length than the
    // max, update the max.
    const end = i;
    // The new max should be the difference between start and end, inclusive.
    const len = end - start + 1;
    if (len > max) {
      max = len;
    }

    // Finally mark this character's last seen index in our map.
    map.set(c, i);
  }

  return max;
}
