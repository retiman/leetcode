// DIFFICULTY: Easy
//
// Given the root of a binary tree, return the length of the diameter of the tree.
//
// The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or
// may not pass through the root.
//
// The length of a path between two nodes is represented by the number of edges between them.
//
// See {@link https://leetcode.com/problems/diameter-of-binary-tree}
import { TreeNode } from './common/tree-node';
export { diameterOfBinaryTree };

// SOLUTION:
//
// For any node, the longest path might:
//
// - Pass through the node, in which case the longest path is the longest path of the left and right subtrees, plus one.
// - Not pass through the node, in which case the longest path is the max of the longest path of the left and right.
//
// We can use DFS to traverse the tree and keep track of the longest path we've seen so far.
function diameterOfBinaryTree(root: TreeNode | null): number {
  let max = 0;

  function dfs(node: TreeNode | null): number {
    if (node === null) {
      return 0;
    }

    // Figure out the max depth of the left and right subtrees.
    const left = dfs(node.left);
    const right = dfs(node.right);

    // The left and right depths represent the current diameter of the tree rooted at this node.  We'll compare it
    // with the global max diameter.
    const current = left + right;
    max = Math.max(current, max);

    // Return the max depth starting from the current node.  Whichever path (left or right) is longer will be the max
    // depth, but we'll add one to account for the current node.
    return Math.max(left, right) + 1;
  }

  dfs(root);
  return max;
}
