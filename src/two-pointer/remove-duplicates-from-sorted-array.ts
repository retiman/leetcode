// DIFFICULTY: EASY
//
// Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique
// element appears only once. The relative order of the elements should be kept the same. Then return the number of
// unique elements in nums.
//
// Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:
//
// Change the array nums such that the first k elements of nums contain the unique elements in the order they were
// present in nums initially. The remaining elements of nums are not important as well as the size of nums.
//
// Return k.
//
// See {@link https://leetcode.com/problems/remove-duplicates-from-sorted-array/}
export { removeDuplicates };

// SOLUTION:
//
// Use the two pointer technique to iterate through the array at different speeds.  The first pointer moves through the
// array as number.  The second pointer, j, will point to the last unique element.
function removeDuplicates(nums: number[]): number {
  if (nums.length === 0) {
    return 0;
  }

  // Initialize the first pointer that moves through the array at normal speed.  The first element is always unique.
  let i = 1;

  // Initialize the second pointer to move only if we found a unique element.
  let j = 0;

  while (i < nums.length) {
    const current = nums[i];
    const lastUnique = nums[j];

    // If the current element is different from the last unique element, then we have a new unique element.  So advance
    // the unique pointer, then copy the current element to the unique pointer.
    if (current !== lastUnique) {
      j++;
      nums[j] = current;
    }

    // Now advance the other pointer to continue through the array.
    i++;
  }

  // The index j tracks the last unique element, so the number of unique elements is j + 1.  Contrast this to the remove
  // element problem.
  const k = j + 1;
  return k;
}
