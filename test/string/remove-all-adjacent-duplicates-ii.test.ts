import { removeDuplicates } from '../../src/string/remove-all-adjacent-duplicates-ii';

describe('remove all adjacent duplicates ii', () => {
  test('remove all adjacent duplicates ii - test case 1', async () => {
    expect(removeDuplicates('abcd', 2)).toBe('abcd');
  });

  test('remove all adjacent duplicates ii - test case 2', async () => {
    expect(removeDuplicates('deeedbbcccbdaa', 3)).toBe('aa');
  });
});
