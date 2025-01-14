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
// You can do this with quick select, similar to quick sort.  The idea is to eliminate half of the search space at each
// step.  You pick a pivot element (using heuristics, or even randomly), then partition the array into two halves: left
// half has elements smaller than the pivot, right half has elements larger than the pivot.
//
// After the partition, you can check if the pivot is the (n - k)th element.  If it is, you're done.  If not, recurse
// into the left or right partitions depending on the pivot's position.
//
// That said, the leetcode questions seem to be crafted to ruin poor pivot index choices.
//
// The other way to do this is to use a heap.  You can do this an efficient way or an inefficient way.  The inefficient
// way involves jamming all the elements onto a max heap, then popping off k elements to get the kth largest element.
//
// The efficient way is to maintain a min heap and only ever allow k elements on the heap.  This way, each time you pop
// an element off the heap, you're left with ever larger elements.  Since the heap size is k, the kth largest element
// will be at the top of the heap.
//
// COMPLEXITY:
//
// The quick select method has an average time complexity of O(n), but a worst case time complexity of O(n^2),
// especially if you pick the wrong pivot each time.  However, the space complexity is O(1).
//
// The min heap approach is O(n log k) time complexity, and O(k) space complexity.
//
// The latter offers you more consistent run times.
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

  // This is a min heap, so the smallest element is at the front.  However, there are (k - 1) larger elements in
  // elsewhere in the heap.  That makes the front element the kth largest element.
  const result = heap.front().element;
  return result;
}
