// You are given a nested list of integers nestedList. Each element is either an integer or a list whose elements may also be integers or other lists.
//
// The depth of an integer is the number of lists that it is inside of. For example, the nested list [1,[2,2],[[3],2],1] has each integer's value set to its depth.
//
// Return the sum of each integer in nestedList multiplied by its depth.
//
// See https://leetcode.com/problems/nested-list-weight-sum
import { NestedInteger } from '../../src/leetcode/nested-list-weighted-sum';

describe('nested list weighted sum pt1', () => {
  function depthSum(nestedList: NestedInteger[]): number {
    function compute(x: NestedInteger, depth: number): number {
      if (x.isInteger()) {
        const value = x.getInteger() ?? 0;
        const weight = depth;
        return value * weight;
      }

      let result = 0;
      const ys = x.getList();
      for (let i = 0; i < ys.length; i++) {
        const y = ys[i];
        result += compute(y, depth + 1);
      }

      return result;
    }

    const x = new NestedInteger();
    for (let i = 0; i < nestedList.length; i++) {
      x.add(nestedList[i]);
    }

    return compute(x, 0);
  }

  test('run', async () => {
    expect(depthSum([new NestedInteger(10)])).toBe(10);
    expect(depthSum([new NestedInteger(10), new NestedInteger(20)])).toBe(30);
  });
});
