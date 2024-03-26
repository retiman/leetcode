// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse
// order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
//
// You may assume the two numbers do not contain any leading zero, except the number 0 itself.
//
// See https://leetcode.com/problems/add-two-numbers/
import { ListNode, node2list, number2list } from '../../src/leetcode/add-two-numbers';

describe('add two numbers', () => {
  function list2number(xs: number[]): number {
    let result = 0;

    for (let i = xs.length - 1; i >= 0; i--) {
      const d = xs[i];
      result += d * 10 ** i;
    }

    return result;
  }

  function list2node(xs: number[]): ListNode {
    let root: ListNode | undefined;
    let current: ListNode | undefined;

    for (let i = 0; i < xs.length; i++) {
      if (current === undefined) {
        current = {
          value: xs[i],
          next: null,
        };
        root = current;
        continue;
      }

      current.next = {
        value: xs[i],
        next: null,
      };
      current = current.next;
    }

    return root as unknown as ListNode;
  }

  function addTwoNumbers(x: ListNode, y: ListNode): ListNode {
    const a = list2number(node2list(x));
    const b = list2number(node2list(y));
    const sum = a + b;
    return list2node(number2list(sum));
  }

  test('run', async () => {
    const x = list2node([2, 4, 3]);
    const y = list2node([5, 6, 4]);

    const sum = addTwoNumbers(x, y);

    expect(node2list(x)).toStrictEqual([2, 4, 3]);
    expect(node2list(y)).toStrictEqual([5, 6, 4]);
    expect(node2list(sum)).toStrictEqual([7, 0, 8]);
  });
});
