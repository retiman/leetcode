// DIFFICULTY: Easy
//
// Given the root node of a binary search tree and two integers low and high, return the sum of values of all nodes
// with a value in the inclusive range [low, high].
//
// See {@link https://leetcode.com/problems/range-sum-of-bst/}
import { TreeNode } from './common/tree-node';
export { rangeSumBST };

// SOLUTION:
//
// A simple recursive solution will work.
//
// COMPLEXITY:
//
// The time complexity is O(n) where n is the number of nodes in the tree.
function rangeSumBST(root: TreeNode | null, low: number, high: number): number {
  let sum = 0;

  function traverse(node: TreeNode | null) {
    if (node === null) {
      return;
    }

    if (node.val >= low && node.val <= high) {
      sum += node.val;
    }

    traverse(node.left);
    traverse(node.right);
  }

  traverse(root);
  return sum;
}
