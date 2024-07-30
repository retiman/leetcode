// DIFFICULTY: Medium
//
// Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated
// sequence of one or more dictionary words.
//
// Note that the same word in the dictionary may be reused multiple times in the segmentation.
//
// See https://leetcode.com/problems/word-break/
describe('word break', () => {
  // Note that this problem is significantly easier than word break ii because we don't need to do any backtracking to
  // generate all of the possible sentences.
  //
  // Here we can just incrementally build up a solution using dynamic programming.
  //
  // We loop through the string and seeing if we can build a word out of (0, i).  If we can, we'd like to continue on
  // by seeing if we can build out a word from (0, j) where j > i.  We'll keep going until we've exhausted the string
  // or if we've run out of words to try.
  //
  // However, we'll have to try every possible starting word.  Then every possible secondary word, and so on.  That's
  // why dynamic programming will be useful here.
  function wordBreak(s: string, wordDict: string[]): boolean {
    const set = new Set(wordDict);

    // We'll use a map to indicate if a slice (0,i) can make a sentence.  This can just be an array, because the first
    // index is always going to be 0.  However, we make a map here because it's a little clearer what we are doing.
    const map = new Map<string, boolean>();

    // The slice (0,0) is always going to form a sentence; the base sentence.
    map.set('[0,0)', true);

    // We want to see if we can successfully parse a sentence from [0,s.length), but to do so, we'll incrementally build
    // up whether or not we can parse a sentence from [0,j) for all j <= s.length.
    //
    // Yes we want j <= s.length because slice is exclusive on the last index.
    for (let i = 0; i < s.length; i++) {
      // We want j <= s.length here because slice is exclusive on the last index [i,j).
      for (let j = i + 1; j <= s.length; j++) {
        const word = s.slice(i, j);
        if (!set.has(word)) {
          continue;
        }

        // If the slice (0,i) formed a sentence, then (0,j) must form a sentence because (i,j) is a word.  For example,
        // if (0,i) was 'hello' and (i,j) was 'there', then (0,j) slice of 'hellothere' is a sentence
        if (map.has(`[0,${i})`)) {
          map.set(`[0,${j})`, true);
        }
      }
    }

    // If we've formed a sentence using all the characters, we've got a winner here.
    return map.has(`[0,${s.length})`);
  }

  test('word break - test case 1', () => {
    const s = 'leetcode';
    const wordDict = ['leet', 'code'];

    expect(wordBreak(s, wordDict)).toBe(true);
  });
});
