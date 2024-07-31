// DIFFICULTY: Medium
//
// You are given an integer array heights representing the heights of buildings, some bricks, and some ladders.
//
// You start your journey from building 0 and move to the next building by possibly using bricks or ladders.
//
// While moving from building i to building i+1 (0-indexed),
//
// - If the current building's height is greater than or equal to the next building's height, you do not need a ladder
//   or bricks.
// - If the current building's height is less than the next building's height, you can either use one ladder or
//   (h[i+1] - h[i]) bricks.
//
// Return the furthest building index (0-indexed) you can reach if you use the given ladders and bricks optimally.
//
// See https://leetcode.com/problems/furthest-building-you-can-reach/
import { MinPriorityQueue } from '@datastructures-js/priority-queue';

describe('furthest building you can reach', () => {
  // This cannot be solved with the sliding window technique; usually that technique involves finding a fixed size
  // sub-string sub-array with constraints.  Here we need to dynamically adjust our resource (brick/ladder) usage at
  // each step, making a greedy algorithm better to solve the problem.
  function furthestBuilding(heights: number[], bricks: number, ladders: number): number {
    // Use a heap/priority queue to store the number of jumps we need to make with either bricks or ladders.
    const heap = new MinPriorityQueue();

    for (let i = 0; i < heights.length - 1; i++) {
      const delta = heights[i + 1] - heights[i];

      // If the height is same level or lower, we can jump across with no penalty.
      if (delta <= 0) {
        continue;
      }

      // If the height is higher by some amount, push it onto the heap and make a determination on whether we use a
      // ladder or some bricks to scale the difference.
      //
      // We should use ladders on the biggest deltas, so if we greedily consume the smallest deltas from the heap, as
      // long as we have enough ladders to cover the remaining length of the heap, we can continue.
      heap.enqueue(delta);

      // As mentioned, the heap stores how many jumps that consume ladders or bricks at this point.  Because ladders
      // can represent any number of bricks, this means that we "buy" elements in the heap, or that the heap may have
      // an ambient size.
      //
      // For example, normally each element pushed onto the heap must be popped off.  However, if we have 3 ladders,
      // the min heap is permitted to contain 3 elements that don't need to be popped off.  These 3 elements are the
      // biggest deltas, and we use ladders to traverse them.
      //
      // At this moment, we don't know which 3 elements will be the biggest, but we just treat 3 as the "floor" size of
      // the heap and continue if we haven't met this floor.
      if (ladders >= heap.size()) {
        // Assume that this delta, at height i, will be claimed by a ladder.
        continue;
      }

      // If, at this point, we've run out of ladders, we'll need to pop off the smallest element and use bricks to cross
      // the delta.  This will cause the largest element to be different, but the ladder doesn't care how big the
      // largest element is.
      const smallest = heap.dequeue().element as number;
      bricks -= smallest;

      // If we've run out of bricks, it's okay.  But if we've gone negative into bricks, we can't cross this gap and
      // we return i (since we can't get to i + 1).
      if (bricks < 0) {
        return i;
      }
    }

    // There's no building at heights.length; the last building is at heights.length - 1.
    return heights.length - 1;
  }

  test('furthest building - test case 1', async () => {
    const heights = [4, 2, 7, 6, 9, 14, 12];
    expect(furthestBuilding(heights, 5, 1)).toBe(4);
  });

  test('furthest building - test case 2', async () => {
    const heights = [4, 12, 2, 7, 3, 18, 20, 3, 19];
    expect(furthestBuilding(heights, 10, 2)).toBe(7);
  });

  test('furthest building - test case 3', async () => {
    const heights = [14, 3, 19, 3];
    expect(furthestBuilding(heights, 17, 0)).toBe(3);
  });
});
