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

export function convert(xs: Array<number | null>): TreeNode | null {
  if (xs.length === 0 || xs[0] === null) {
    return null;
  }

  const root = new TreeNode(xs[0]);
  const queue: Array<TreeNode | null> = [root];

  let i = 1;
  while (i < xs.length) {
    const current = queue.shift();
    if (current === null) {
      continue;
    }

    if (i < xs.length && xs[i] !== null) {
      current!.left = new TreeNode(xs[i]!);
      queue.push(current!.left);
    }
    i++;

    if (i < xs.length && xs[i] !== null) {
      current!.right = new TreeNode(xs[i]!);
      queue.push(current!.right);
    }
    i++;
  }

  return root;
}
