// DIFFICULTY: MEDIUM
//
// Given an input string s, reverse the order of the words.
//
// A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space.
//
// Return a string of the words in reverse order concatenated by a single space.
//
// Note that s may contain leading or trailing spaces or multiple spaces between two words. The returned string should
// only have a single space separating the words. Do not include any extra spaces.
//
// See {@link https://leetcode.com/problems/reverse-words-in-a-string/}
export { reverseWords };

// SOLUTION:
function reverseWords(s: string): string {
  let reversed = '';
  let word = '';
  let i = s.length - 1;

  while (i >= 0) {
    // If we see a non space character, we are going to continue forming our word.
    if (s[i] !== ' ') {
      // Don't add it to the end; we are looping backwards and getting 'eulb' instead of 'blue'.  Instead build the
      // string in reverse.
      word = s[i] + word;
      i--;
      continue;
    }

    // If we see a space character, we will add our word to the reversed result, but only if we actually have a word
    // to form.
    if (word.length !== 0) {
      // If we've already added words to the reversed sentence, separate this one with a space.
      if (reversed.length > 0) {
        reversed += ' ';
      }

      // Otherwise just add our word.
      reversed += word;

      // Reset our word and continue;
      word = '';
      i--;
      continue;
    }

    // Otherwise if there's a space and we have no word, just continue.
    i--;
  }

  // Now add the last word to the list, if there is one.
  if (word.length !== 0) {
    if (reversed.length > 0) {
      reversed += ' ';
    }
    reversed += word;
  }

  return reversed;
}
