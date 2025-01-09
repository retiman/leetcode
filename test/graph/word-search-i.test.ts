import { exist } from '../../src/graph/word-search-i';

describe('word search i', () => {
  test('word search i - test case 1', async () => {
    const board = [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E']
    ];
    const word = 'ABCCED';

    expect(exist(board, word)).toBe(true);
  });
});
