import { NumArray } from '../../src/prefix-sum/range-sum-query-immutable';

describe('range sum query immutable', () => {
  test('range sum query immutable - test case 1', async () => {
    const arr = new NumArray([-2, 0, 3, -5, 2, -1]);

    expect(arr.sumRange(0, 2)).toBe(1);
    expect(arr.sumRange(2, 5)).toBe(-1);
    expect(arr.sumRange(0, 5)).toBe(-3);
  });
});
