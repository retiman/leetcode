// DIFFICULTY: Medium
//
// Given an integer array nums and an integer k, return the kth largest element in the array.
//
// Note that it is the kth largest element in the sorted order, not the kth distinct element.
//
// Can you solve it without sorting?
//
// See {@link https://leetcode.com/problems/kth-largest-element-in-an-array/}
import { MaxPriorityQueue } from '@datastructures-js/priority-queue';
import { BinarySearchMaxHeap } from './common/binary-search-max-heap';
import { SimpleMaxHeap } from './common/simple-max-heap';
export { findKthLargest, findKthLargestBinarySearch, findKthLargestSimple };

// SOLUTION:
//
// You can use quick select to do the most efficient algorithm, but it's very complicated.  Instead, we'll just use
// a heap to do this almost as efficiently.  This does not sort the array, but it is a bit slower than quick select.
//
// That said, the leetcode questions seem to be crafted to ruin poor pivot index choices.
function findKthLargest(nums: number[], k: number): number {
  const heap = new MaxPriorityQueue<number>();
  for (const num of nums) {
    heap.enqueue(num);
  }

  // Now just remove k-1 elements and the top element of the heap will be the answer.
  for (let i = 0; i < k - 1; i++) {
    heap.dequeue();
  }

  // The kth largest element will be at the top of the queue.
  const result = heap.front();
  return result;
}

// You can use a simple heap that sorts in a pinch.
function findKthLargestSimple(nums: number[], k: number): number {
  const heap = new SimpleMaxHeap<number>();
  for (const num of nums) {
    heap.enqueue(num);
  }

  for (let i = 0; i < k - 1; i++) {
    heap.dequeue();
  }

  const result = heap.front();
  return result;
}

// You can use a simple heap that does binary search insert in a pinch.
function findKthLargestBinarySearch(nums: number[], k: number): number {
  const heap = new BinarySearchMaxHeap<number>();
  for (const num of nums) {
    heap.enqueue(num);
  }

  for (let i = 0; i < k - 1; i++) {
    heap.dequeue();
  }

  const result = heap.front();
  return result;
}
