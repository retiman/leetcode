// DIFFICULTY: Easy
//
// You are given the heads of two sorted linked lists list1 and list2.
//
// Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.
//
// Return the head of the merged linked list.
//
// See {@link https://leetcode.com/problems/merge-two-sorted-lists/}
import { ListNode } from './common/list-node';
export { mergeTwoLists };

// SOLUTION:
//
// A straightforward solution works.
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  let head: ListNode | null = null;
  let tail: ListNode | null = null;
  let left = list1;
  let right = list2;

  while (left !== null || right !== null) {
    let node = null;

    if (left === null && right !== null) {
      node = right;
      right = right.next;
    }

    if (left !== null && right === null) {
      node = left;
      left = left.next;
    }

    if (left !== null && right !== null) {
      if (left.val <= right.val) {
        node = left;
        left = left.next;
      } else {
        node = right;
        right = right.next;
      }
    }

    if (tail === null) {
      tail = node;
      head = node;
    } else {
      tail.next = node;
      tail = tail.next;
    }
  }

  return head;
}
