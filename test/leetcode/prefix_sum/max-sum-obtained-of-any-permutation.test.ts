import { maxSumRangeQuery } from '../../src/prefix-sum/max-sum-obtained-of-any-permutation';

describe('maximum sum obtained of any permutation', () => {
  test('maximum sum obtained of any permutation - test case 1', async () => {
    expect(
      maxSumRangeQuery(
        [1, 2, 3, 4, 5],
        [
          [1, 3],
          [0, 1]
        ]
      )
    ).toBe(19);
  });
});
