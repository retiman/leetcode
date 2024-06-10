export class ListNode {
  val: number;

  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function node2list(node: ListNode | null): number[] {
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

export function list2node(xs: number[]): ListNode {
  let root: ListNode | undefined;
  let current: ListNode | undefined;

  for (let i = 0; i < xs.length; i++) {
    if (current === undefined) {
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

  return root as unknown as ListNode;
}
