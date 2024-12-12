// DIFFICULTY: Easy
//
// You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n,
// representing the number of elements in nums1 and nums2 respectively.
//
// Merge nums1 and nums2 into a single array sorted in non-decreasing order.
//
// The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To
// accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged,
// and the last n elements are set to 0 and should be ignored. nums2 has a length of n.
//
// See https://leetcode.com/problems/merge-sorted-array/
describe('merge sorted array', () => {
  function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    let [i, j, k] = [0, 0, m + n - 1];

    while (i < m || j < n) {
      const a = nums1[i];
      const b = nums2[j];

      // If we've reached the end of the first array, just jam the second array's items in without comparison.
      if (i === m) {
        nums1[k] = b;
        k--;
        j++;
        continue;
      }

      // If we've reached the end of the second array, just jam the first array's items in without comparison.
      if (j === n) {
        nums1[k] = a;
        k--;
        i++;
        continue;
      }

      // Otherwise, jam the least element in.  We can simplify this logic, but this is more straightforward.
      if (a < b) {
        nums1[k] = a;
        k--;
        i++;
        continue;
      }

      nums1[k] = b;
      k--;
      j++;
    }

    nums1.reverse();
  }

  test('merge sorted array - test case 1', async () => {
    const nums1 = [1, 2, 3, 0, 0, 0];
    const m = 3;
    const nums2 = [2, 5, 6];
    const n = 3;

    merge(nums1, m, nums2, n);

    expect(nums1).toStrictEqual([1, 2, 2, 3, 5, 6]);
  });
});
