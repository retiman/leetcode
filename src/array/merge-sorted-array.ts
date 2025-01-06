// DIFFICULTY: EASY
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
// See {@link https://leetcode.com/problems/merge-sorted-array/}
export { merge };

// SOLUTION:
//
// This would be VERY easy, if you could use extra memory.  To merge without using extra memory, we do need to merge
// into the bigger array, nums1.
//
// You could go about this in two different ways:
//
// 1. Start from the logical beginning of both arrays and swap elements as needed to maintain the correct order.
// 2. Start from the logical end of both arrays and add largest elements to the end of nums1.
//
// Going with option 1 is more natural, but it's more error prone and more work.  There may be elements at the end of
// nums1 that need to be shifted to the right to make room.
//
// Going with option 2 is less natural, but it ensures you have enough space.  Since nums1 has size m + n, and nums2 has
// size n, you can reliably fit all of nums2 into nums1 without any collisions or shifting.  Additionally, if you use
// up all the elements in nums2, you don't need to do anything with the remaining elements of nums1 since they are
// already sorted.
//
// Pro tip: when asked to do something in place, and you have extra space, consider doing backwards iteration instead of
// forwards to avoid collisions and overwriting elements.  Secondly, if you started with forwards iteration and realize
// you might have to shift elements, consider a backwards iteration approach to see if it might work better.
//
// The problem doesn't state this, but we assume using no extra memory either.
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
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
