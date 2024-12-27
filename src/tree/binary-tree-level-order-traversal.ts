// DIFFICULTY: Medium
//
// Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right,
// level by level).
//
// See https://leetcode.com/problems/binary-tree-level-order-traversal/
import { TreeNode } from './common/tree-node';
export { levelOrder };

// SOLUTION:
//
// This is essentially a BFS algorithm from the root node.
//
// COMPLEXITY:
//
// Each node is visited once, so the time complexity is O(n).
function levelOrder(root: TreeNode | null): number[][] {
  if (root === null) {
    return [];
  }

  const result: number[][] = [];
  const queue: TreeNode[] = [root];

  // Consume the nodes in the current level while noting the frontier nodes.  The nodes at the current level will be
  // recorded, then the frontier nodes are added to the queue.
  while (queue.length > 0) {
    const level: number[] = [];
    const frontier: TreeNode[] = [];

    // Consume all the nodes from the current level and record them.  Don't use the queue.length in the for loop as
    // we are going to be modifying the queue during the loop.
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      level.push(node.val);

      if (node.left !== null) {
        frontier.push(node.left);
      }

      if (node.right !== null) {
        frontier.push(node.right);
      }
    }

    // Add the recorded nodes at this level to the result.
    result.push(level);

    // Continue processing frontier nodes.
    queue.push(...frontier);
  }

  return result;
}
