import { runningSum } from '../../src/prefix-sum/running-sum-of-1d-array';

describe('running sum of 1d array', () => {
  test('running sum - test case 1', async () => {
    expect(runningSum([1, 2, 3, 4])).toStrictEqual([1, 3, 6, 10]);
  });
});
