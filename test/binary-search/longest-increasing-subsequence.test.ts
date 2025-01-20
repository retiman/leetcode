import { lengthOfLIS } from '../../src/binary-search/longest-increasing-subsequence';

describe('longest increasing subsequence', () => {
  test('lengthOfLIS - test case i', () => {
    expect(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])).toEqual(4);
  });
});
