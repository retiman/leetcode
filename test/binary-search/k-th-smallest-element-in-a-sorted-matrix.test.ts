import { kthSmallest } from '../../src/binary-search/k-th-smallest-element-in-a-sorted-matrix';

describe('k-th smallest element in a sorted matrix', () => {
  test('kthSmallest - test case 1', () => {
    const matrix = [
      [1, 5, 9],
      [10, 11, 13],
      [12, 13, 15]
    ];
    const k = 8;

    expect(kthSmallest(matrix, k)).toEqual(13);
  });
});
