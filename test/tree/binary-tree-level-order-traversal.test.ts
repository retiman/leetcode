// DIFFICULTY: Medium
//
// Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right,
// level by level).
//
// See https://leetcode.com/problems/binary-tree-level-order-traversal/
import { TreeNode } from '../../src/tree/binary-tree-level-order-traversal';

describe('binary tree level order traversal', () => {
  // This is essentially a BFS algorithm from the root node.
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
      const qsize = queue.length;
      for (let i = 0; i < qsize; i++) {
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

      // Continue processing the frontier nodes.
      queue.push(...frontier);
    }

    return result;
  }

  // The input is given to us as an array, which is the level order traversal, but without subarrays.  Any null nodes
  // are explicitly represented.
  //
  // To do this, use a queue to keep track of the nodes we have seen.
  function __deserialize(array: (number | null)[]) {
    if (array.length === 0) {
      return null;
    }

    const root = new TreeNode(array[0]!);
    const queue = [root];
    let i = 1;

    while (queue.length > 0 && i < array.length) {
      const node = queue.shift()!;
      if (node === null) {
        continue;
      }

      // Add the left node.
      if (i < array.length) {
        const val = array[i];
        if (val !== null) {
          node.left = new TreeNode(val);
          queue.push(node.left);
        } else {
          node.left = null;
        }
        i++;
      }

      // Add the right node.
      if (i < array.length) {
        const val = array[i];
        if (val !== null) {
          node.right = new TreeNode(val);
          queue.push(node.right);
        } else {
          node.right = null;
        }
        i++;
      }
    }

    return root;
  }

  test('level order - test case 1', async () => {
    const array = [3, 9, 20, null, null, 15, 7];
    const tree = __deserialize(array);

    expect(levelOrder(tree)).toStrictEqual([[3], [9, 20], [15, 7]]);
  });

  test('level order - test case 2', async () => {
    const array = [1];
    const tree = __deserialize(array);

    expect(levelOrder(tree)).toStrictEqual([[1]]);
  });

  test('level order - test case 3', async () => {
    const array: (number | null)[] = [];
    const tree = __deserialize(array);

    expect(levelOrder(tree)).toStrictEqual([]);
  });
});
