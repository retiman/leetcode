import { reverseWords } from '../../src/string/reverse-words-in-a-string';

describe('reverse words in a string', () => {
  test('reverse words in a string - test case 1', async () => {
    expect(reverseWords('the sky is blue')).toBe('blue is sky the');
  });
});
