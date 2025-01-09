import { removeDuplicates } from '../../src/string/remove-all-adjacent-duplicates-i';

describe('remove all adjacent duplicates i', () => {
  test('remove all adjacent duplicates i - test case 1', async () => {
    expect(removeDuplicates('abbaca')).toBe('ca');
  });
});
