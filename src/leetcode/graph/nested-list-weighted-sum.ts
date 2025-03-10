// DIFFICULTY: MEDIUM
//
// You are given a nested list of integers nestedList. Each element is either an integer or a list whose elements may
// also be integers or other lists.
//
// The depth of an integer is the number of lists that it is inside of. For example, the nested list [1,[2,2],[[3],2],1]
// has each integer's value set to its depth.
//
// Return the sum of each integer in nestedList multiplied by its depth.
//
// See {@link https://leetcode.com/problems/nested-list-weight-sum}
import { NestedInteger } from '../linked-list/common/nested-integer';
export { depthSum };

// SOLUTION:
//
// This is essentially a depth first search problem.  However, because it a nested list, there's no need to keep track
// of visited elements.  Instead we'll just keep track of the depth as we traverse the list.
//
// COMPLEXITY:
//
// Time complexity is O(n) where n is the number of total integers and lists in the data structure.
//
// Space complexity is O(d) where d is the depth of the nested list, since we need a stack frame for each level of
// recursion.
function depthSum(nestedList: NestedInteger[]): number {
  function compute(x: NestedInteger, depth: number): number {
    // If we've encountered an integer, compute the weighted value according to the depth.
    if (x.isInteger()) {
      const value = x.getInteger() ?? 0;
      const weight = depth;
      return value * weight;
    }

    // Otherwise, we have a list, so we'll recursively compute the weighted sum of the list.
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
