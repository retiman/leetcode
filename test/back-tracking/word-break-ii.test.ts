// DIFFICULTY: HARD
//
// Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a
// valid dictionary word. Return all such possible sentences in any order.
//
// Note that the same word in the dictionary may be reused multiple times in the segmentation.
//
// See https://leetcode.com/problems/word-break-ii/
describe('word break ii', () => {
  function wordBreak(s: string, wordDict: string[]): string[] {
    const set = new Set(wordDict);

    // Since values can be re-calculated, let's memoize the results.
    const memo = new Map<number, string[]>();

    // This generates all possible sentences using words that start at index i (if any exist) recursively.
    //
    // Since the only words we have available to us are the ones in the wordDict, we'll just have to loop through from
    // i to the end of the string to see if any of those substrings form a 'word'.
    function generate(i: number): string[] {
      // Because we are slicing from [i, j), and slice is exclusive on the second index, we will be starting at i + 1.
      // Therefore, do the bounds check for i === s.length.
      if (i === s.length) {
        return [];
      }

      if (memo.has(i)) {
        return memo.get(i)!;
      }

      const sentences: string[] = [];

      // Attempt to generate sentences beginning with the 'word' from i to j.  Note that we want to slice from i to j,
      // so we actually want j to start at i + 1, and we also want to include j === s.length, because the slice function
      // is inclusive for the first index, and exclusive for the second index.
      for (let j = i + 1; j <= s.length; j++) {
        const word = s.slice(i, j);
        if (!set.has(word)) {
          continue;
        }

        // Now generate all possible sentences using words that start at index j (if any exist), and put the word from
        // index i in front.
        const rest = generate(j);

        // If the problem allowed us to generate sentences using a partial selection of characters (e.g. if we couldn't
        // make more words at this point), we could just add the current word to the result, even if there were unused
        // characters remaining.
        //
        // However, the problem does not allow us to do this, so we only add the current word if there are no unused
        // characters remaining.
        if (rest.length === 0 && j === s.length) {
          sentences.push(word);
          continue;
        }

        // If we could generate words starting at j, prepend the word starting at index i.
        for (const sentence of rest) {
          sentences.push(`${word} ${sentence}`);
        }
      }

      memo.set(i, sentences);
      return sentences;
    }

    return generate(0);
  }

  test('word break ii - test case 1', async () => {
    const s = 'catsanddog';
    const words = ['cat', 'cats', 'and', 'sand', 'dog'];

    expect(wordBreak(s, words)).toMatchSnapshot();
  });

  test('word break ii - test case 2', async () => {
    const s = 'pineapplepenapple';
    const words = ['apple', 'pen', 'applepen', 'pine', 'pineapple'];

    expect(wordBreak(s, words)).toMatchSnapshot();
  });

  test('word break ii - test case 2', async () => {
    const s = 'catsandog';
    const words = ['cats', 'dog', 'sand', 'and', 'cat'];

    expect(wordBreak(s, words)).toStrictEqual([]);
  });
});
