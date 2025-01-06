// DIFFICULTY: MEDIUM
//
// You are given an integer array arr of length n that represents a permutation of the integers in the range [0, n - 1].
//
// We split arr into some number of chunks (i.e., partitions), and individually sort each chunk. After concatenating
// them, the result should equal the sorted array.
//
// Return the largest number of chunks we can make to sort the array.
//
// See {@link https://leetcode.com/problems/max-chunks-to-make-sorted/}
export { maxChunksToSorted };

// SOLUTION:
//
// Because we know the elements in the array are a permutation of numbers less than n, we can use a greedy approach
// by keeping track of the max element seen so far.
//
// Unlike the other problem, this does not require using a stack.
function maxChunksToSorted(xs: number[]) {
  let chunks = 0;
  let max = 0;

  for (let i = 0; i < xs.length; i++) {
    max = Math.max(max, xs[i]);

    // Because all elements are a permutation of the numbers from 0 to xs.length - 1, if we encounter i === max,
    // this means that for sure all elements < i can be sorted to form a chunk.
    //
    // Again, because all elements to the right of i are going to be greater than max (and i), then we can be sure
    // that the next element begins a new chunk.
    if (i === max) {
      chunks++;
    }
  }

  return chunks;
}
