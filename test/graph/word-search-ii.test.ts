import { findWords } from "../../src/graph/word-search-ii";

describe('word search ii', () => {
  test('word search ii - test case 1', async () => {
    const board = [
      ['o', 'a', 'a', 'n'],
      ['e', 't', 'a', 'e'],
      ['i', 'h', 'k', 'r'],
      ['i', 'f', 'l', 'v']
    ];
    const words = ['oath', 'pea', 'eat', 'rain'];

    expect(findWords(board, words)).toMatchSnapshot();
  });

  test('word search ii - test case 2', async () => {
    const board = [
      ['a', 'b'],
      ['c', 'd']
    ];
    const words = ['abcb'];

    expect(findWords(board, words)).toStrictEqual([]);
  });

  test('word search ii - test case 3', async () => {
    const board = [['a', 'a']];
    const words = ['aaa'];

    expect(findWords(board, words)).toStrictEqual([]);
  });

  test('word search ii - test case 4', async () => {
    const board = [
      ['o', 'a', 'a', 'n'],
      ['e', 't', 'a', 'e'],
      ['i', 'h', 'k', 'r'],
      ['i', 'f', 'l', 'v']
    ];
    const words = ['oath', 'pea', 'eat', 'rain', 'hklf', 'hf'];

    expect(findWords(board, words)).toMatchSnapshot();
  });
});
