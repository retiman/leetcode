// DIFFICULTY: MEDIUM
//
// Given an integer array nums and an integer k, return the kth largest element in the array.
//
// Note that it is the kth largest element in the sorted order, not the kth distinct element.
//
// Can you solve it without sorting?
//
// See {@link https://leetcode.com/problems/kth-largest-element-in-an-array/}
const { MinPriorityQueue } = require('@datastructures-js/priority-queue');
export { findKthLargest };

// SOLUTION:
//
// You can use quick select to do the most efficient algorithm, but it's very complicated.  Instead, we'll just use
// a heap to do this almost as efficiently.  This does not sort the array, but it is a bit slower than quick select.
//
// That said, the leetcode questions seem to be crafted to ruin poor pivot index choices.
//
// COMPLEXITY:
//
// The heap can be created in O(n * log(k)) time.
function findKthLargest(nums: number[], k: number): number {
  // Use a min heap because we'll want to pop off the smallest element every time we reach the limit.
  const heap = new MinPriorityQueue();

  // Iterate through the numbers, and jam numbers on the heap until we have k elements.
  for (const num of nums) {
    heap.enqueue(num);

    // Now we have the k + 1 smallest elements we've seen so far.  If we get a new element, pop from the
    // heap, which will leave us with larger elements in the heap.
    //
    // At the end, we'll pop off all the smallest elements, leaving us with the top k largest elements.
    if (heap.size() > k) {
      heap.dequeue();
    }
  }

  // This is a min heap, so the smallest element is at the front.  However, there are k elements and we
  // the kth smallest element, so it's at the top!
  const result = heap.front().element;
  return result;
}
