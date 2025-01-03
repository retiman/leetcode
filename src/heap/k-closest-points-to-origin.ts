// DIFFICULTY: Medium
//
// Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the
// k closest points to the origin (0, 0).
//
// The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).
//
// You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).
//
// See {@link https://leetcode.com/problems/k-closest-points-to-origin/}
import { MaxPriorityQueue } from '@datastructures-js/priority-queue';
export { kClosest };

// SOLUTION:
//
// The request for "k-closest" indicates you'll want a heap.  Using a either a min heap or max heap will work.
//
// With a min heap, just jam all the points on the heap and then slice the first k elements.  This requires storing all
// the points on the heap.
//
// With a max heap, you can jam points on the heap until you have k elements.  Then, when you have a new point, compare
// it to the max element on the heap.  If it's closer, pop off the max element and jam it on the heap; otherwise, ignore
// it.
//
// The max heap approach can be more efficient, so we'll go that route.
//
// COMPLEXITY:
//
// With a min heap, it will be O(n * log(n)) to insert all the points on the heap.
//
// With a max heap, if k is much smaller than n, it will be O(n * log(k)) to insert all the points on the heap.
function kClosest(points: number[][], k: number): number[][] {
  // Calculates the distance to the origin.  Technically, since we're only using the distance to do comparison, we
  // don't need to take the square root since they are all going to compare the same square root or not.  I'm leaving
  // it here for correctness.
  function distance(p: number[]) {
    const [x, y] = p;
    return Math.sqrt(x ** 2 + y ** 2);
  }

  // The datastructures-js/priority-queue behavior depends on the comparator.  Make sure you do (a, b) => b - a to get
  // max heap behavior, or else you'll end up with a min heap.
  const heap = new MaxPriorityQueue({ compare: (a: number[], b: number[]) => distance(b) - distance(a) });
  for (const p of points) {
    heap.enqueue(p);

    // If we have more than k elements, remove the farthest point.
    if (heap.size() > k) {
      heap.dequeue();
    }
  }

  // Why do we need this cast?  Because of LeetCode, TypeScript, datastructures-js, and the reason.
  const array = heap.toArray() as unknown;
  return array as number[][];
}
