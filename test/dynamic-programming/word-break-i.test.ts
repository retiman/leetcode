import { wordBreak } from '../../src/dynamic-programming/word-break-i.test';

describe('word break i', () => {
  test('word break i - test case 1', () => {
    const s = 'leetcode';
    const wordDict = ['leet', 'code'];

    expect(wordBreak(s, wordDict)).toBe(true);
  });
});
