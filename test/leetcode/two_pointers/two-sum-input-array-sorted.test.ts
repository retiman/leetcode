import { twoSum } from '../../src/two-pointer/two-sum-input-array-sorted';

describe('two sum - input array is sorted', () => {
  test('two sum sorted - test case 1', async () => {
    expect(twoSum([2, 7, 11, 15], 9)).toStrictEqual([1, 2]);
  });

  test('two sum sorted - test case 2', async () => {
    expect(twoSum([2, 3, 4], 6)).toStrictEqual([1, 3]);
  });

  test('two sum sorted - test case 3', async () => {
    expect(twoSum([-1, 0], -1)).toStrictEqual([1, 2]);
  });
});
