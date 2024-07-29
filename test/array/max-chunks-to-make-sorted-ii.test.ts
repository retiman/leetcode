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
  // We can use a stack to keep track of chunks.  Rather than store the *entire* chunk on the stack, we just store the
  // largest element.  That's because if we have chunks [1, 3] and [4, 5, 9], it's enough to know that [? to 3] and
  // [? to 9] form chunks.
  //
  // When we encounter a new number, like 10, we make a new chunk (since we want as many chunks as possible).  When we
  // encounter a new number, like 7, we include it as part of the chunk from [? to 9].  But because we might have seen
  // a 7 or 6 or some other number in between earlier, we'll have to go down the stack and prune out numbers we don't
  // need anymore.
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
      //
      // Conceptually, if you have chunks [1], [3], [5] then you see a [9], then this starts a new chunk.
      if (x > stack[stack.length - 1]) {
        stack.push(x);
        continue;
      }

      // Otherwise, xs[i] is part of the chunk which is made up of all chunks where stack[j] > xs[i].  Pop these chunks
      // off the stack so you can "merge" them.
      //
      // Conceptually, if you have chunks [1], [3], [5], [9], then you see a [4], then you can't begin a new chunk.
      // Instead, you know that [4, 5, 9] constitute a chunk.  However, we don't need to store all numbers [4, 5, 9] in
      // the stack; we only need to store the largest element in the chunk [9].
      //
      // Therefore, go down the stack and pop off elements in the stack we don't want.
      const max = stack[stack.length - 1];
      while (x < stack[stack.length - 1]) {
        stack.pop();
      }

      stack.push(max);
    }

    return stack.length;
  }

  test('max chunks to make sorted ii - test case 1', async () => {
    expect(maxChunksToSorted([5, 4, 3, 2, 1])).toBe(1);
  });
});
