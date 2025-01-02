// DIFFICULTY: Medium
//
// You are given the root of a binary tree containing digits from 0 to 9 only.
//
// Each root-to-leaf path in the tree represents a number.
//
// For example, the root-to-leaf path 1 -> 2 -> 3 represents the number 123.
//
// Return the total sum of all root-to-leaf numbers. Test cases are generated so that the answer will fit in a 32-bit integer.
//
// A leaf node is a node with no children.
//
// See {@link https://leetcode.com/problems/sum-root-to-leaf-numbers}
import { TreeNode } from './common/tree-node';
export { sumNumbers };

// SOLUTION:
//
// This is a simple DFS problem.  Just keep track of the current number as you traverse the tree.  If you reach a leaf,
// add it to the running tally and sum up all the numbers at the end.
function sumNumbers(root: TreeNode | null): number {
  const xs: number[] = [];
  if (root === null) {
    return 0;
  }

  function dfs(node: TreeNode | null, sum: number) {
    if (node === null) {
      return;
    }

    // Only add to the running list if we're at a leaf.
    const x = sum * 10 + node.val;
    if (node.left === null && node.right === null) {
      xs.push(x);
      return;
    }

    dfs(node.left, x);
    dfs(node.right, x);
  }

  dfs(root, 0);
  return xs.reduce((a, b) => a + b, 0);
}
