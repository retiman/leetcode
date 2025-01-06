// DIFFICULTY: EASY
//
// Given the roots of two binary trees p and q, write a function to check if they are the same or not.
//
// Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.
//
// See {@link https://leetcode.com/problems/same-tree/}
import { TreeNode } from './common/tree-node';
export { isSameTree };

// SOLUTION:
//
// A simple recursive solution will work.
//
// COMPLEXITY:
//
// The time complexity is O(n) where n is the number of nodes in the tree.
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
