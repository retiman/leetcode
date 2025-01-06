// DIFFICULTY: MEDIUM
//
// Given an integer array nums and an integer k, return the kth largest element in the array.
//
// Note that it is the kth largest element in the sorted order, not the kth distinct element.
//
// Can you solve it without sorting?
//
// See {@link https://leetcode.com/problems/kth-largest-element-in-an-array/}
const { MaxPriorityQueue } = require('@datastructures-js/priority-queue');
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
// The heap can be created in O(n * log(n)) time.  Removing k elements from the heap is O(k * log(n)), so the total
// complexity is still O(n * log(n)).
function findKthLargest(nums: number[], k: number): number {
  const heap = new MaxPriorityQueue();
  for (const num of nums) {
    heap.enqueue(num);
  }

  // Now just remove k-1 elements and the top element of the heap will be the answer.
  for (let i = 0; i < k - 1; i++) {
    heap.dequeue();
  }

  // The kth largest element will be at the top of the queue.
  const result = heap.front().element;
  return result;
}
