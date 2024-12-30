// This class definition comes from the problem itself and we cannot change it, or else our submission will not be
// accepted.
export class _Node {
  val: number;
  left: _Node | null;
  right: _Node | null;
  parent: _Node | null;

  constructor(v: number) {
    this.val = v;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

// The LeetCode test input is given as an array, but the exact code to construct the tree is not given.  This is likely
// how they've implemented it.
export function array2tree(array: (number | null)[]): _Node | null {
  if (array.length === 0) {
    return null;
  }

  const root = new _Node(array[0]!);
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
        node.left = new _Node(val);
        node.left.parent = node;
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
        node.right = new _Node(val);
        node.right.parent = node;
        queue.push(node.right);
      } else {
        node.right = null;
      }
      i++;
    }
  }

  return root;
}
