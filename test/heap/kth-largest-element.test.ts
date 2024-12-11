// DIFFICULTY: Medium
//
// Given an integer array nums and an integer k, return the kth largest element in the array.
//
// Note that it is the kth largest element in the sorted order, not the kth distinct element.
//
// Can you solve it without sorting?
//
// See https://leetcode.com/problems/kth-largest-element-in-an-array/
import fs from 'fs';
import path from 'path';
import { MaxPriorityQueue } from '@datastructures-js/priority-queue';
import { SimpleMaxHeap } from '../../src/heap/simple-heap';
import { BinarySearchMaxHeap } from '../../src/heap/bs-search-heap';

describe('kth largest element in an array', () => {
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
    const result = heap.front().element;
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

    const result = heap.front().value;
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

    const result = heap.front().value;
    return result;
  }
  test('find kth largest - test case 1', async () => {
    expect(findKthLargest([3, 2, 1, 5, 6, 4], 2)).toBe(5);
    expect(findKthLargestSimple([3, 2, 1, 5, 6, 4], 2)).toBe(5);
    expect(findKthLargestBinarySearch([3, 2, 1, 5, 6, 4], 2)).toBe(5);
  });

  test('find kth largest - test case 2', async () => {
    expect(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toBe(4);
    expect(findKthLargestSimple([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toBe(4);
    expect(findKthLargestBinarySearch([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toBe(4);
  });

  test.skip('find kth largest - test case 3', async () => {
    const data = fs.readFileSync(path.join(__dirname, '__data__', 'kth-largest-element.test.json')).toString();
    const array = JSON.parse(data);

    expect(findKthLargest(array, 50000)).toBe(1);
    expect(findKthLargestSimple(array, 50000)).toBe(1);
    expect(findKthLargestBinarySearch(array, 50000)).toBe(1);
  });
});
