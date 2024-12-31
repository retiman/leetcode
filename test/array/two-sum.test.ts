import { find } from '../../src/array/two-sum';

describe('two sum', () => {
  test('two sum - test case 2', async () => {
    expect(find([2, 7, 11, 15], 9)).toStrictEqual([0, 1]);
    expect(find([3, 2, 4], 6)).toStrictEqual([1, 2]);
    expect(find([3, 3], 6)).toStrictEqual([0, 1]);
  });
});
