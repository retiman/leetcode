// DIFFICULTY: HARD
//
// You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
//
// Merge all the linked-lists into one sorted linked-list and return it.
//
// See {@link https://leetcode.com/problems/merge-k-sorted-lists/}
import { ListNode } from './common/list-node';
export { mergeKLists };

// SOLUTION:
//
// Instead of only 2 lists, we have to merge k lists.  To do this, we have to scan every list to find the minimum
// element, then add it to the current head.
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  let head: ListNode | null = null;
  let tail: ListNode | null = null;

  while (true) {
    // We scan every element to find the minimum value and then add it to the current head.  In theory we could sort
    // the list first, then when one of the lists advances, remove it from the list and then insert it again in sorted
    // order resulting in a log(n) optimization.
    let min: number | undefined;
    let index = -1;
    for (let i = 0; i < lists.length; i++) {
      const node = lists[i];
      if (node === null) {
        continue;
      }

      if (min === undefined || node.val <= min) {
        min = node.val;
        index = i;
      }
    }

    // If we didn't find anything to add, that means all the lists were empty, so we can stop.
    if (index === -1) {
      break;
    }

    // Add the minimum value node to the result list.
    if (tail === null) {
      head = new ListNode(min);
      tail = head;
    } else {
      tail.next = new ListNode(min);
      tail = tail.next;
    }

    // Advance the list pointer in the lists to be merged.
    const node = lists[index];
    if (node !== null) {
      lists[index] = node.next;
    }
  }

  return head;
}
