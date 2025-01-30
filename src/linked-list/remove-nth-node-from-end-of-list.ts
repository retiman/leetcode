// DIFFICULTY: MEDIUM
//
// Given the head of a linked list, remove the nth node from the end of the list and return its head.
//
// @see {@link https://leetcode.com/problems/remove-nth-node-from-end-of-list/}
import { ListNode } from './common/list-node';
export { removeNthFromEnd };

// SOLUTION:
//
// To do this in one iteration, throw all the nodes onto a list.  Then we can easily find the nth node from the end of
// the list.  After that, we just have to point the (k - 1)th node to the (k + 1)th node.  Assuming both exist.
//
// You can also do this using two pointers, but this solution is a more straightforward.
//
// COMPLEXITY:
//
// Runs in O(n) time because we are iterating through the list once.  Runs in O(n) space because we are storing the list
// in an array.
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  // Just convert the linked list to an array so we can easily find the nth node from the end.
  const list: ListNode[] = [];
  let node: ListNode | null = head;
  while (node !== null) {
    list.push(node);
    node = node.next;
  }

  // Now make sure this operation can even be done.  If n is 0 or greater than the length of the list, then we can't
  // then we can't remove anything!
  if (head === null || n <= 0 || n > list.length) {
    return head;
  }

  // Create sentinel nodes to make the logic easier, and so we can return the head of the list later.
  const sentinel = new ListNode();
  sentinel.next = head;

  // Now that we know n is within bounds, let's find the node we want to remove.  For example, if we want to remove the
  // 2nd node from the end of the list with 3 elements, then the index is 1 (3 - 2 = 1).
  //
  // After this we just have point the (k - 1)th node to the (k + 1)th node.  Assuming both exist.
  const k = list.length - n;

  // The previous node to remove is the a = (k - 1)th node.  If it turns out the (k - 1)th node doesn't exist, then node
  // a is the sentinel node we created.
  const a = list[k - 1] ?? sentinel;

  // The next node to link it to is the c = (k + 1)th node.  If it turns out that the (k + 1)th node doesn't exist, then
  // node c is null.
  const c = list[k + 1] ?? null;

  // Unlink the node b in position list[k] by setting the a node's next pointer to c.
  a.next = c;

  // Return the list minus the sentinel.
  return sentinel.next;
}
