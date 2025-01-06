// DIFFICULTY: Easy
//
// Given an array arr of positive integers sorted in a strictly increasing order, and an integer k.
//
// Return the kth positive integer that is missing from this array.
//
// See {@link https://leetcode.com/problems/kth-missing-positive-number/}
export { findKthPositive };

// SOLUTION:
//
// There are multiple naive ways to do this.  One way is to throw all elements into a set, then iterate from 1 to the
// max set element, and check if the element is in the set.  Do this k times to find the k-th missing element.
//
// Another naive way to do this is to do a linear scan, and keep count of the missing numbers.  You'd also keep a count
// of what the current element *should* be versus the current index.  If the current index matches current element, then
// continue on.  Otherwise increment the count of missing numbers.  If the count of missing numbers is equal to k, then
// you've found it.
//
// Finally, you can use binary search to find the k-th missing element.  Since the array is sorted, there's no need to
// scan the entire array.  We can calculate how many missing numbers exist at each index, and use that information to
// determine if we should go left or right.
function findKthPositive(arr: number[], k: number): number {
  // Use insertion point binary search to find the k-th missing element.
  let left = 0;
  let right = arr.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    // So at the mid index, if there were no missing elements, then arr[mid] should be mid + 1.  For example, if we have
    //
    // [1, 2, 3, 4, 5]
    //
    // ...then mid === 2, and arr[2] === 3.  And 3 === mid + 1.  Therefore, there are arr[2] - (2 + 1) missing elements,
    // and here we have 0 missing elements.
    const missing = arr[mid] - (mid + 1);

    // If there aren't enough missing numbers, then the k-th missing number must be to the right, so update the left
    // pointer to be mid + 1.
    if (missing < k) {
      left = mid + 1;
    }
    // If there are too many missing numbers, then the k-th missing number must be to the left, so update the right
    // pointer to be mid - 1;
    else {
      right = mid;
    }
  }

  // At this point, left === right, and left represents the index where missing >= k.  Recall that if no numbers were
  // missing, then arr[left] + 1 === left.  If we assume that arr[left] + 1 > left by a COUNT of k elements, then we
  // can find the VALUE of the k-th missing element, we add k to left.  This also works if there are no "missing"
  // elements (e.g. [1, 2, 3, 4]).
  return left + k;
}
