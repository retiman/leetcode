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

export function list2node(xs: number[]) {
  let head: ListNode | null = null;
  let current: ListNode | null = null;

  xs.forEach(x => {
    const node = new ListNode(x);
    if (current === null) {
      current = node;
      head = node;
    } else {
      current.next = node;
      current = current.next;
    }
  });

  return head;
}
