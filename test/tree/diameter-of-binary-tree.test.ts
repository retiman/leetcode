// DIFFICULTY: Easy
//
// Given the root of a binary tree, return the length of the diameter of the tree.
//
// The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or
// may not pass through the root.
//
// The length of a path between two nodes is represented by the number of edges between them.
//
// See https://leetcode.com/problems/diameter-of-binary-tree
import { TreeNode } from '../../src/tree/diameter-of-binary-tree';

describe('diameter of binary tree', () => {
  function diameterOfBinaryTree(root: TreeNode | null): number {
    let max = 0;

    function traverse(node: TreeNode | null): number {
      if (node === null) {
        return 0;
      }

      // Figure out the max depth of the left and right subtrees.
      const left = traverse(node.left);
      const right = traverse(node.right);

      // The left and right depths summed will give you the diameter assuming this is the root node.  Compare this with
      // the global max.
      const diameter = left + right;
      max = Math.max(diameter, max);

      // This node's contribution to the depth is whatever the max of the left and right subtree depths are, plus one
      // for it's own edge to the subtree.
      return Math.max(left, right) + 1;
    }

    traverse(root);
    return max;
  }

  test('diameter of binary tree - test case 1', async () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);

    expect(diameterOfBinaryTree(root)).toBe(2);
  });

  test('diameter of binary tree - test case 2', async () => {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);

    expect(diameterOfBinaryTree(root)).toBe(3);
  });
});
