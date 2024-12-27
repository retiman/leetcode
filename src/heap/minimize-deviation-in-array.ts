// DIFFICULTY: Hard
//
// You are given an array nums of n positive integers.
//
// You can perform two types of operations on any element of the array any number of times:
//
// If the element is even, divide it by 2.
//
// For example, if the array is [1,2,3,4], then you can do this operation on the last element, and the array will be
// [1,2,3,2].
//
// If the element is odd, multiply it by 2.
//
// For example, if the array is [1,2,3,4], then you can do this operation on the first element, and the array will be
// [2,2,3,4].
//
// The deviation of the array is the maximum difference between any two elements in the array.
//
// Return the minimum deviation the array can have after performing some number of operations.
//
// See {@link https://leetcode.com/problems/minimize-deviation-in-array/}
const { MaxPriorityQueue } = require('@datastructures-js/priority-queue');
export { minimumDeviation };

// SOLUTION:
//
// To solve this problem, we have to multiply elements to make them bigger, or divide elements to make them smaller.
// We continue to do this until the minimum and maximum elements are as close as possible.
//
// To make this problem easier, we try to minimize the deviation by making bigger numbers smaller, instead of
// simultaneously trying to make numbers bigger and smaller.  To do this, we multiply all odd numbers by 2, so that
// they all become even.  Afterwards, we can choose to perform a division or not to make it smaller.
//
// COMPLEXITY:
//
// Runs in O(n * log(n)) time due to the heap operations.
function minimumDeviation(nums: number[]): number {
  // Initialize a max heap of all the numbers in this array.
  const heap = new MaxPriorityQueue();

  // Normalize all the numbers so that they are even.  Now we can consider only division as a way to make numbers
  // smaller and closer to each other.  If a previously odd number was too big, we will eventually resize it smaller
  // by division if necessary.
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 1) {
      nums[i] *= 2;
    }

    heap.enqueue(nums[i]);
  }

  let min = Math.min(...nums);
  let deviation = Infinity;

  // Calculate the current deviation using the max element in the array, then half the max element and return it to
  // the heap.  Then repeat to bring the deviation down more and more.
  while (true) {
    // Calculate current deviation.
    const max = heap.dequeue().element;
    deviation = Math.min(deviation, max - min);

    // Oh no!  If the max value was odd, we can't halve it and re-insert it into the heap.  This means whatever the
    // deviation is now, we are stuck, as halving smaller even values will not change the deviation.
    if (max % 2 === 1) {
      break;
    }

    // Halve the max value and return it into the heap for re-processing.
    const value = max / 2;
    heap.enqueue(value);

    // Update the minimum value in case we've changed the minimum value by manipulating the max value.
    min = Math.min(value, min);
  }

  return deviation;
}
