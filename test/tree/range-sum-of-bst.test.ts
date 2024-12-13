// DIFFICULTY: Easy
//
// Given the root node of a binary search tree and two integers low and high, return the sum of values of all nodes
// with a value in the inclusive range [low, high].
//
// See https://leetcode.com/problems/range-sum-of-bst/
import { TreeNode, convert } from '../../src/tree/range-sum-of-bst';

describe('range sum of bst', () => {
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

  test('range sum of bst - test case 1', async () => {
    const root = convert([10, 5, 15, 3, 7, null, 18]);
    expect(rangeSumBST(root, 7, 15)).toBe(32);
  });
});
