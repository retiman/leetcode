// DIFFICULTY: HARD
//
// You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
//
// Merge all the linked-lists into one sorted linked-list and return it.
//
// See {@link https://leetcode.com/problems/merge-k-sorted-lists/}
import { MinPriorityQueue } from '@datastructures-js/priority-queue';
import { ListNode } from '../linked-list/common/list-node';
export { mergeKLists };

// SOLUTION:
//
// Instead of only 2 lists, we have to merge k lists.  The naive way is to do a linear scan of the head of every list
// to find the smallest element then create a new list node with that element and append it to the result list.
//
// However, we can do better by using a heap to store the head of each list so we can always find the minimum value
// without a linear scan.  Additionally, the problem does not say we cannot reuse the input lists, so we do not have to
// create new list nodes.
//
// COMPLEXITY:
//
// There are k lists, so each enqueuing operation will take O(log k) time complexity.  However, we are going to do this
// for every node in the list, so the total time complexity is O(n * log k) where n is the total number of nodes in all
// the lists.  The naive approach with a linear scan would be O(n * k).
//
// Space complexity is O(k) because we are storing the head of each list in the heap, and we do not create new list
// nodes.
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  // Use a heap to store the head of each list so we can always find the minimum value to add to the result list
  // without resorting to a linear scan.
  const heap = new MinPriorityQueue({ priority: (node: ListNode) => node.val });
  for (const head of lists) {
    if (head !== null) {
      heap.enqueue(head);
    }
  }

  // As we keep advancing the current node, we'll lose track of the head.  Let's have a sentinel node so that we can
  // always keep track of where the list begins.
  const sentinel = new ListNode(-1);
  let current = sentinel;
  while (heap.size() > 0) {
    const smallest = heap.dequeue().element;

    // Advance the current node and push the smallest element in.
    current.next = smallest;
    current = current.next;

    // Now, advance the smallest node to the next value.
    if (smallest.next !== null) {
      heap.enqueue(smallest.next);
    }
  }

  // The sentinel node will point to the head of the list, so we did not lose it.
  return sentinel.next;
}
