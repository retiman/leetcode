// DIFFICULTY: Medium
//
// You are given a nested list of integers nestedList. Each element is either an integer or a list whose elements may
// also be integers or other lists.
//
// The depth of an integer is the number of lists that it is inside of. For example, the nested list [1,[2,2],[[3],2],1]
// has each integer's value set to its depth. Let maxDepth be the maximum depth of any integer.
//
// The weight of an integer is maxDepth - (the depth of the integer) + 1.
//
// Return the sum of each integer in nestedList multiplied by its weight.
//
// See {@link https://leetcode.com/problems/nested-list-weight-sum-ii/}
import { NestedInteger } from './common/nested-integer';
export { depthSumInverse };

// SOLUTION:
//
// Unlike the previous problem where we just multiply the integer by its depth, we need to multiply by the weight of the
// of the integer.  Since we won't know the weight until after we've traversed the entire list, we'll need to keep track
// of depth to integers, then calculate the weight and sum up at the end.
function depthSumInverse(nestedList: NestedInteger[]): number {
  type Integer = number;
  type Depth = number;

  // Define a map of depth to a list of integers; each integer at that depth will have the same weight.  We'll compute
  // the max depth as we go.
  const map = new Map<Depth, Integer[]>();
  let max = 0;

  // Build up the map of depth -> ints recursively.
  function compute(x: NestedInteger, depth: number): void {
    if (depth > max) {
      max = depth;
    }

    if (x.isInteger()) {
      const value = x.getInteger() ?? 0;
      const list = map.get(depth) ?? [];
      list.push(value);
      map.set(depth, list);
      return;
    }

    const ys = x.getList();
    for (let i = 0; i < ys.length; i++) {
      const y = ys[i];
      compute(y, depth + 1);
    }
  }

  for (let i = 0; i < nestedList.length; i++) {
    const z = nestedList[i];
    compute(z, 0);
  }

  // Once we have the map, just multiply each list of integers at each depth by the computed weight and sum.
  let result = 0;
  map.forEach((values, depth) => {
    const weight = max - depth + 1;
    const partial = values.reduce((x, y) => x + y) * weight;
    result += partial;
  });

  return result;
}
