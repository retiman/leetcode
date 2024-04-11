// CATEGORY: Tree
//
// Given the roots of two binary trees p and q, write a function to check if they are the same or not.
//
// Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.
//
// See https://leetcode.com/problems/same-tree/
import { TreeNode } from '../../../src/leetcode/easy/same-tree';

describe('same tree', () => {
  function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if (p === null) {
      return q === null;
    }

    if (q === null) {
      return p === null;
    }

    if (p.val !== q.val) {
      return false;
    }

    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
  }

  test('run', async () => {
    expect(isSameTree(null, null)).toBe(true);
    expect(isSameTree(new TreeNode(10, null, null), new TreeNode(10, null, null)));
  });
});
