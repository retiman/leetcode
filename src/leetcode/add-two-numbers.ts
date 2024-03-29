export interface ListNode {
  val: number;
  next: ListNode | null;
}

export function node2list(node: ListNode): number[] {
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
        next: null,
      };
      root = current;
      continue;
    }

    current.next = {
      val: xs[i],
      next: null,
    };
    current = current.next;
  }

  return root as unknown as ListNode;
}
