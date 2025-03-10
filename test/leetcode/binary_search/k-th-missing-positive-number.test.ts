import { findKthPositive } from '../../src/binary-search/k-th-missing-positive-number';

describe('k-th-missing-positive-number', () => {
  test('find kth positive - test case 1', () => {
    const arr = [2, 3, 4, 7, 11];
    const k = 5;

    expect(findKthPositive(arr, k)).toEqual(9);
  });

  test('find kth positive - test case 2', () => {
    const arr = [1, 2, 3, 4];
    const k = 2;

    expect(findKthPositive(arr, k)).toEqual(6);
  });
});
