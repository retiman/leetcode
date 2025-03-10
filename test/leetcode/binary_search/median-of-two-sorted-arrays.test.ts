import { findMedianSortedArrays } from '../../src/binary-search/median-of-two-sorted-arrays';

describe('median of two sorted arrays', () => {
  test('median of two sorted arrays - test case 4', async () => {
    expect(findMedianSortedArrays([1, 3], [2])).toBe(2);
  });

  test('median of two sorted arrays - test case 5', async () => {
    expect(findMedianSortedArrays([3, 2, 3, 1, 2, 4, 5, 5, 6], [4])).toBe(3);
  });
});
