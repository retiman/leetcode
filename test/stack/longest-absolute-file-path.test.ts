import { lengthLongestPath } from '../../src/stack/longest-absolute-file-path';

describe('longest absolute file path', () => {
  test('longest absolute file path - test case 1', async () => {
    expect(lengthLongestPath('dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext')).toBe(20);
  });
});
