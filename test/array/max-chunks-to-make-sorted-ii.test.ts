// DIFFICULTY: Medium
//
// You are given an integer array arr.
//
// We split arr into some number of chunks (i.e., partitions), and individually sort each chunk. After concatenating
// them, the result should equal the sorted array.
//
// Return the largest number of chunks we can make to sort the array.
//
// See https://leetcode.com/problems/max-chunks-to-make-sorted-ii/
describe('max chunks to make sorted ii', () => {
  function maxChunksToSorted(xs: number[]) {
    // The element stack[i] is the max element of chunk i.  At the end, the length of the stack is the number of chunks
    // we can create.
    //
    // We keep track of the max element of chunks, because the smallest element of the next chunk needs to be greater
    // than the maximum element of the current chunk.
    const stack = [xs[0]];

    // Start iteration at 1 because you already pushed the first element onto the stack.
    for (let i = 1; i < xs.length; i++) {
      const x = xs[i];

      // If this element is larger than top of stack, then xs[i] is part of a new chunk.  Therefore, push it onto the
      // stack and begin the new chunk.
      if (x > stack[stack.length - 1]) {
        stack.push(x);
        continue;
      }

      // Otherwise, xs[i] is part of the chunk which is made up of all chunks where stack[j] > xs[i].  Pop these chunks
      // off the stack so you can "merge" them.
      const max = stack[stack.length - 1];
      while (x < stack[stack.length - 1]) {
        stack.pop();
      }

      stack.push(max);
    }

    return stack.length;
  }

  test('test case 1', async () => {
    expect(maxChunksToSorted([5, 4, 3, 2, 1])).toBe(1);
  });
});
