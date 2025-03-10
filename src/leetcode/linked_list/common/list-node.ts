// This class definition comes from the problem itself and we cannot change it, or else our submission will not be
// accepted.
export class ListNode {
  val: number;

  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function list2array(node: ListNode | null): number[] {
  if (node === null) {
    return [];
  }

  const xs: number[] = [];
  let current: ListNode | null = node;
  while (current !== null) {
    xs.push(current.val);
    current = current.next;
  }
  return xs;
}

export function array2list(xs: number[] | null): ListNode | null {
  if (xs === null) {
    return null;
  }

  let root: ListNode | null = null;
  let current: ListNode | null = null;
  for (let i = 0; i < xs.length; i++) {
    if (current === null) {
      current = {
        val: xs[i],
        next: null
      };
      root = current;
      continue;
    }

    current.next = {
      val: xs[i],
      next: null
    };
    current = current.next;
  }

  return root;
}
