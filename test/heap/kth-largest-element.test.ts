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

describe('kth largest element in an array', () => {
  // You can use quick select to do the most efficient algorithm, but it's very complicated.  Instead, we'll just use
  // a heap to do this almost as efficiently.  This does not sort the array, but it is a bit slower than quick select.
  //
  // That said, the leetcode questions seem to be crafted to ruin poor pivot index choices.
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
    const result = heap.front().element as number;
    return result;
  }

  // You can use quick select to do the most efficient algorithm, but it's very complicated.  We have it here as an
  // example.
  function __findKthLargest(nums: number[], k: number): number {
    return __qselect(nums, 0 /* left */, nums.length - 1 /* right */, nums.length - k /* target */);
  }

  // The selection problem can be solved using the quick select algorithm (also used in quicksort).  This can be done
  // in O(n) time.
  //
  // The idea is to select a pivot element and then partition elements to the left or right of it.  The partitioning
  // algorithm essentially *partially sorts* the array, but only the parts that we care about to find the kth largest
  // element.
  //
  // The issue with using quick select is that we need to find a good pivot index.  Doing so using the median of medians
  // approach is extremely complicated.  The leetcode test cases are crafted specifically to destroy the running time
  // of quick select algorithms that do not use a good pivot index.
  function __qselect(xs: number[], left: number, right: number, target: number) {
    if (left === right) {
      return xs[left];
    }

    // As a quick and dirty hack, you can use the left/right elements as a guess for a good pivot.  A better way is to
    // use the median of medians approach, but come on, in a 1 hour tech screen?!  Instead we can do something quick and
    // like just use a random element for our guess.
    const guess = left + Math.floor(Math.random() * (right - left + 1));

    // Partition the array around the rightmost element.  After partitioning, all elements less than xs[right] will
    // be to the left side of the array.  The value at xs[right] will be at our pivot.
    const pivot = __partition(xs, left, right, guess);

    // If the kth largest element is at the target index, then all elements to the right of the target are larger, and
    // all elements to the left are smaller.
    //
    // However, this is also the case for our pivot index.  So if the pivot index and the target index match, then we
    // have found the element we are looking for.
    if (target === pivot) {
      return xs[pivot];
    }

    // If the pivot index was smaller than our guess, then we need to search to the right of the pivot.
    if (pivot < target) {
      return __qselect(xs, pivot + 1, right, target);
    }

    // If the pivot index was larger than our guess, then we need to search to the left of the pivot.
    return __qselect(xs, left, pivot - 1, target);
  }

  // Partition the array around a pivot element.  All elements before the pivot index are less than the pivot.
  //
  // For example, take this array slice: [2,9,1,7,6].  Once partitioned, it will become [2,1 | 6 | 9,7]; the index of
  // element 6 is returned.
  function __partition(xs: number[], left: number, right: number, guess: number) {
    const pivot = xs[guess];

    // Move the pivot element to the end of the array.
    [xs[guess], xs[right]] = [xs[right], xs[guess]];

    // Move along the array with pointer j, and if value is less than the pivot, swap it with xs[i] and increment i.
    // Later we will swap the pivot point with the element at i.
    let i = left;
    for (let j = left; j < right; j++) {
      // If xs[j] is less than the pivot, swap positions with the value at i.
      if (xs[j] < pivot) {
        [xs[i], xs[j]] = [xs[j], xs[i]];
        i++;
      }
    }

    // Swap the pivot element into the right position.
    [xs[i], xs[right]] = [xs[right], xs[i]];

    // This is the index of the pivot element after we have done the partitioning.
    return i;
  }

  test.skip('find kth largest - test case 1', async () => {
    expect(__findKthLargest([3, 2, 1, 5, 6, 4], 2)).toBe(5);
  });

  test('find kth largest - test case 1', async () => {
    expect(findKthLargest([3, 2, 1, 5, 6, 4], 2)).toBe(5);
  });

  test('find kth largest - test case 2', async () => {
    expect(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toBe(4);
  });

  test.skip('find kth largest - test case 3', async () => {
    const data = fs.readFileSync(path.join(__dirname, '__data__', 'kth-largest-element.test.json')).toString();
    const array = JSON.parse(data);

    expect(findKthLargest(array, 50000)).toBe(1);
  });
});
