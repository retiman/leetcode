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
    // Do the comparisons from the logical end of each array to the beginning of each array.  This ensures that you will
    // have enough space at the end of nums1 to fit each element.
    //
    // If you start from the beginning and work your way to the logical end, you may have an issue where you jam all the
    // elements from the second array into the first array, and now the first array's initial elements need to be
    // judiciously swapped to maintain the correct order.
    //
    // The problem does not state this but we assume using no extra memory either.
    let i = m - 1;
    let j = n - 1;
    let last = m + n - 1;

    // Send the largest elements from both arrays to the end of the array nums1.
    while (i >= 0 && j >= 0) {
      const a = nums1[i];
      const b = nums2[j];

      if (a < b) {
        nums1[last] = nums2[j];
        j--;
        last--;
      } else {
        nums1[last] = nums1[i];
        i--;
        last--;
      }
    }

    // Now we have consumed all elements in one of the arrays.
    //
    // If there are remaining elements in nums2, we should add them to the array nums1.
    while (j >= 0) {
      nums1[last] = nums2[j];
      j--;
      last--;
    }

    // On the other hand, if there are remaining elements in nums2, there's nothing to be done because that slice of the
    // array is already sorted.
  }

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
