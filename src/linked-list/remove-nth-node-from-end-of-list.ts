// DIFFICULTY: MEDIUM
//
// Given the head of a linked list, remove the nth node from the end of the list and return its head.
//
// @see {@link https://leetcode.com/problems/remove-nth-node-from-end-of-list/}
import { ListNode } from "./common/list-node";
export { removeNthFromEnd };

// SOLUTION:
//
// To do this in one iteration, throw all the nodes onto a list.  Then we can easily find the nth node from the end of
// the list.  After that, we just have to point the (k - 1)th node to the (k + 1)th node.  Assuming both exist.
//
// COMPLEXITY:
//
// Runs in O(n) time because we are iterating through the list once.  Runs in O(n) space because we are storing the list
// in an array.
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  // Assume this means we aren't going to remove anything.
  if (n === 0 || head === null) {
    return head;
  }

  // Just convert the linked list to an array so we can easily find the nth node from the end.
  const list: ListNode[] = [];
  let node: ListNode | null = head;
  while (node !== null) {
    list.push(node);
    node = node.next;
  }

  // Okay, now we try to find the nth node from the end of the list.  First make sure we can actually do this.  That is,
  // n must be between 1 and the length of the list inclusive.
  if (n > list.length) {
    return head;
  }

  // Special case the single element list to make things easier (here, n === 1).
  if (list.length === 1) {
    return null;
  }

  // Now that we know n is within bounds, let's find the node we want to remove.  For example, if we want to remove the
  // 2nd node from the end of the list with 3 elements, then the index is 1 (3 - 2 = 1).
  //
  // After this we just have point the (k - 1)th node to the (k + 1)th node.  Assuming both exist.
  const k = list.length - n;

  // If the (k + 1)th node doesn't exist, then we are unlinking the tail of the list.  AKA n === 1.
  if (k + 1 === list.length) {
    list[k - 1].next = null;
    return head;
  }

  // If the (k - 1)th node doesn't exist, then we are unlinking the head of the list.  AKA n === stack.length.
  //
  // We can just return head.next as that's the new head.
  if (k - 1 < 0) {
    return head.next;
  }

  // Otherwise just make the (k - 1)th node point to the (k + 1)th node.
  list[k - 1].next = list[k + 1];
  return head;
}