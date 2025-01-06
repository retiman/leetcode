import { wordBreak } from '../../src/recursion/word-break-ii';

describe('word break ii', () => {
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
