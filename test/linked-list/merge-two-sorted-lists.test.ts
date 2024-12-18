// DIFFICULTY: Easy
//
// You are given the heads of two sorted linked lists list1 and list2.
//
// Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.
//
// Return the head of the merged linked list.
//
// See https://leetcode.com/problems/merge-two-sorted-lists/
import { ListNode, list2node, node2list } from '../../src/linked-list/merge-k-sorted-lists';

describe('merge two sorted lists', () => {
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

  function __merge(xs: number[] | null, ys: number[] | null) {
    const left = list2node(xs);
    const right = list2node(ys);
    const merged = mergeTwoLists(left, right);
    return merged === null ? null : node2list(merged);
  }

  test('merge two sorted lists - test case 1', async () => {
    expect(__merge(null, null)).toBeNull();
  });

  test('merge two sorted lists - test case 2', async () => {
    expect(__merge([1], null)).toStrictEqual([1]);
  });

  test('merge two sorted lists - test case 3', async () => {
    expect(__merge(null, [1])).toStrictEqual([1]);
  });

  test('merge two sorted lists - test case 4', async () => {
    expect(__merge([1], [2])).toStrictEqual([1, 2]);
  });

  test('merge two sorted lists - test case 5', async () => {
    expect(__merge([1, 2, 4], [1, 3, 4])).toStrictEqual([1, 1, 2, 3, 4, 4]);
  });
});
