// This class definition comes from the problem itself and we cannot change it, or else our submission will not be
// accepted.
export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// The LeetCode test input is given as an array, but the exact code to construct the tree is not given.  This is likely
// how they've implemented it.
export function array2tree(array: (number | null)[]): TreeNode | null {
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
