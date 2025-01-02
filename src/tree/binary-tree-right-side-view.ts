// DIFFICULTY: Medium
//
// Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes
// you can see ordered from top to bottom.
//

import { TreeNode } from './common/tree-node';

// See {@link https://leetcode.com/problems/binary-tree-right-side-view}
export { rightSideView };

// SOLUTION:
//
// We can use a simple DFS to traverse the tree, and prioritize the right child over the left child.  At each depth,
// we can add the first rightmost node to the result array, since that's the node we'll see when viewing it from the
// right.
function rightSideView(root: TreeNode | null): number[] {
  const depths: number[] = [];

  function dfs(node: TreeNode | null, depth: number) {
    if (node === null) {
      return;
    }

    // If the current depth is the lowest depth we've seen, then it's the rightmost node at this depth, because we will
    // always prioritize going down the right node.
    if (depths.length === depth) {
      depths.push(node.val);
    }

    // Prioritize going down the right subtree first!
    dfs(node.right, depth + 1);
    dfs(node.left, depth + 1);
  }

  dfs(root, 0);
  return depths;
}
