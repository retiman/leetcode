// You are given a nested list of integers nestedList. Each element is either an integer or a list whose elements may also be integers or other lists.
//
// The depth of an integer is the number of lists that it is inside of. For example, the nested list [1,[2,2],[[3],2],1] has each integer's value set to its depth. Let maxDepth be the maximum depth of any integer.
//
// The weight of an integer is maxDepth - (the depth of the integer) + 1.
//
// Return the sum of each integer in nestedList multiplied by its weight.
//
// See https://leetcode.com/problems/nested-list-weight-sum-ii/
import { NestedInteger } from '../../src/leetcode/nested-list-weighted-sum';

describe('nested list weighted sum pt2', () => {
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

  test('run', async () => {
    expect(depthSumInverse([new NestedInteger(10)])).toBe(10);
    expect(depthSumInverse([new NestedInteger(10), new NestedInteger(20)])).toBe(30);
  });
});
