// You are given the heads of two sorted linked lists list1 and list2.
//
// Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.
//
// Return the head of the merged linked list.
//
// See https://leetcode.com/problems/merge-two-sorted-lists/
import { list2node, ListNode } from '../../src/leetcode/merge-two-sorted-lists';

describe('merge two sorted lists', () => {
  function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    let head: ListNode | null = null;
    let current: ListNode | null = null;
    let left = list1;
    let right = list2;

    while (left !== null || right !== null) {
      const node = new ListNode();

      if (left === null && right !== null) {
        node.val = right.val;
        right = right.next;
      }

      if (left !== null && right === null) {
        node.val = left.val;
        left = left.next;
      }

      if (left !== null && right !== null) {
        if (left.val <= right.val) {
          node.val = left.val;
          left = left.next;
        } else {
          node.val = right.val;
          right = right.next;
        }
      }

      if (current === null) {
        current = node;
        head = node;
      } else {
        current.next = node;
        current = current.next;
      }
    }

    return head;
  }

  test('run', async () => {
    expect(mergeTwoLists(null, null)).toBeNull();
    expect(mergeTwoLists(new ListNode(1), null)).toStrictEqual(new ListNode(1));
    expect(mergeTwoLists(null, new ListNode(1))).toStrictEqual(new ListNode(1));
    expect(mergeTwoLists(new ListNode(1), new ListNode(2))).toMatchSnapshot();
    expect(mergeTwoLists(list2node([1, 2, 4]), list2node([1, 3, 4]))).toMatchSnapshot();
  });
});
