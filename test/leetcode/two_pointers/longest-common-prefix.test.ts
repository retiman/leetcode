import { longestCommonPrefix } from '../../src/two-pointer/longest-common-prefix';

describe('longest common prefix', () => {
  test('longest common prefix - test case 1', async () => {
    expect(longestCommonPrefix(['ab', 'a'])).toBe('a');
  });

  test('longest common prefix - test case 2', async () => {
    expect(longestCommonPrefix(['a'])).toBe('a');
  });

  test('longest common prefix - test case 3', async () => {
    expect(longestCommonPrefix(['flower', 'flow', 'flight'])).toBe('fl');
  });

  test('longest common prefix - test case 4', async () => {
    expect(longestCommonPrefix(['dog', 'racecar', 'car'])).toBe('');
  });

  test('longest common prefix - test case 5', async () => {
    expect(longestCommonPrefix(['', 'car'])).toBe('');
  });
});
