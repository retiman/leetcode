import { longestConsecutive } from '../../src/array/longest-consecutive-sequence';

describe('longest consecutive sequence', () => {
  test('longest consecutive - test case 1', async () => {
    expect(longestConsecutive([100, 4, 200, 1, 3, 2])).toBe(4);
  });
});
