// DIFFICULTY: MEDIUM
//
// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse
// order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
//
// You may assume the two numbers do not contain any leading zero, except the number 0 itself.
//
// See {@link https://leetcode.com/problems/add-two-numbers/}
import { ListNode } from './common/list-node';
export { addTwoNumbers };

// SOLUTION:
//
// A naive solution of converting the nodes to numbers, adding them, and them, and then reconstructing the linked list
// does work, but is a bunch more code.
//
// Since the lists are stored in reverse order, you can add the two head nodes, preserving a carry, and create a new
// node, in the same way you would do elementary school addition.
function addTwoNumbers(x: ListNode | null, y: ListNode | null): ListNode | null {
  function add(u: ListNode | null, v: ListNode | null, carry: number) {
    if (u === null && v === null) {
      return carry > 0 ? new ListNode(1) : null;
    }

    // Compute the sum and carry for the current node.
    const a = u?.val ?? 0;
    const b = v?.val ?? 0;
    const sum = a + b + carry;
    const val = sum < 10 ? sum : sum - 10;
    const node = new ListNode();

    // Compute the sum for the next node and attach it to this one.
    const uNext = u?.next ?? null;
    const vNext = v?.next ?? null;
    const carryNext = sum < 10 ? 0 : 1;
    node.val = val;
    node.next = add(uNext, vNext, carryNext);
    return node;
  }

  return add(x, y, 0);
}
