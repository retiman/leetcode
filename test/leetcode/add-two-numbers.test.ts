// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse
// order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
//
// You may assume the two numbers do not contain any leading zero, except the number 0 itself.
//
// See https://leetcode.com/problems/add-two-numbers/
import { ListNode } from '../../src/leetcode/add-two-numbers';
import * as main from '../../src/leetcode/add-two-numbers';

describe('add two numbers', () => {
  function addTwoNumbers(x: ListNode, y: ListNode): ListNode {
    function node2list(node: ListNode): number[] {
      const xs: number[] = [];
      let current: ListNode | null = node;
      while (current !== null) {
        xs.push(current.val);
        current = current.next;
      }
      return xs;
    }

    function list2number(xs: number[]): number {
      let result = 0;

      for (let i = xs.length - 1; i >= 0; i--) {
        const d = xs[i];
        result += d * 10 ** i;
      }

      return result;
    }

    function number2list(n: number): number[] {
      const s = n.toString(10 /* radix */);

      const xs: number[] = [];
      for (let i = s.length - 1; i >= 0; i--) {
        const d = parseInt(s.charAt(i), 10 /* radix */);
        xs.push(d);
      }

      return xs;
    }

    function list2node(xs: number[]): ListNode {
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

    const a = list2number(node2list(x));
    const b = list2number(node2list(y));
    const sum = a + b;
    return list2node(number2list(sum));
  }

  test('run', async () => {
    function add(a: number[], b: number[]) {
      const x = main.list2node(a);
      const y = main.list2node(b);
      const z = addTwoNumbers(x, y);
      return main.node2list(z);
    }

    expect(add([2, 4, 3], [5, 6, 4])).toStrictEqual([7, 0, 8]);
  });
});
