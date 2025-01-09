import { secondsToRemoveOccurrences } from '../../src/string/time-needed-to-rearrange-binary-string';

describe('time needed to rearrange a binary string', () => {
  test('time needed to rearrange a binary string - test case 1', async () => {
    expect(secondsToRemoveOccurrences('0110101')).toBe(4);
  });
});
