export interface ListNode {
  value: number;
  next: ListNode | null;
}

export function node2list(node: ListNode): number[] {
  const xs: number[] = [];
  let current: ListNode | null = node;
  while (current !== null) {
    xs.push(current.value);
    current = current.next;
  }
  return xs;
}

export function number2list(x: number): number[] {
  const s = x.toString(10 /* radix */);

  const xs: number[] = [];
  for (let i = s.length - 1; i >= 0; i--) {
    const d = parseInt(s.charAt(i), 10 /* radix */);
    xs.push(d);
  }

  return xs;
}
