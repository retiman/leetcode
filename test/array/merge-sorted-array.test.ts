import { merge } from '../../src/array/merge-sorted-array';

describe('merge sorted array', () => {
  test('merge sorted array - test case 1', async () => {
    const nums1 = [1, 2, 3, 0, 0, 0];
    const m = 3;
    const nums2 = [2, 5, 6];
    const n = 3;

    merge(nums1, m, nums2, n);

    expect(nums1).toStrictEqual([1, 2, 2, 3, 5, 6]);
  });

  test('merge sorted array - test case 2', async () => {
    const nums1 = [4, 5, 6, 0, 0, 0];
    const m = 3;
    const nums2 = [1, 2, 3];
    const n = 3;

    merge(nums1, m, nums2, n);

    expect(nums1).toStrictEqual([1, 2, 3, 4, 5, 6]);
  });
});
