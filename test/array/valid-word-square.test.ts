// Given an array of strings words, return true if it forms a valid word square.
//
// A sequence of strings forms a valid word square if the kth row and column read the same string, where
// 0 <= k < max(numRows, numColumns).
//
// See https://leetcode.com/problems/valid-word-square/
describe('valid word square', () => {
  function validWordSquare(words: string[]): boolean {
    for (let i = 0; i < words.length; i++) {
      for (let j = 0; j < words[i].length; j++) {
        try {
          if (words[i][j] !== words[j][i]) {
            return false;
          }
        } catch {
          return false;
        }
      }
    }

    return true;
  }

  test('valid word square - test case 1', async () => {
    const words = ['abcd', 'bnrt', 'crmy', 'dtye'];

    expect(validWordSquare(words)).toBe(true);
  });

  test('valid word square - test case 2', async () => {
    const words = ['abcd', 'bnrt', 'crm', 'dt'];

    expect(validWordSquare(words)).toBe(true);
  });
});
