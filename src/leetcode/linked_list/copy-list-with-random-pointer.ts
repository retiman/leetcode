// DIFFICULTY: MEDIUM
//
// A linked list of length n is given such that each node contains an additional random pointer, which could point to
// any node in the list, or null.
//
// Construct a deep copy of the list. The deep copy should consist of exactly n brand new nodes, where each new node has
// its value set to the value of its corresponding original node. Both the next and random pointer of the new nodes
// should point to new nodes in the copied list such that the pointers in the original list and copied list represent
// the same list state. None of the pointers in the new list should point to nodes in the original list.
//
// For example, if there are two nodes X and Y in the original list, where X.random --> Y, then for the corresponding
// two nodes x and y in the copied list, x.random --> y.
//
// Return the head of the copied linked list.
//
// The linked list is represented in the input/output as a list of n nodes. Each node is represented as a pair of
// [val, random_index] where:
//
// - val: an integer representing Node.val
// - random_index: the index of the node (range from 0 to n-1) that the random pointer points to, or null if it does not point to any node.
//
// Your code will only be given the head of the original linked list.
//
// See {@link https://leetcode.com/problems/copy-list-with-random-pointer}
import { _Node } from './common/random-node';
export { copyRandomList };

// SOLUTION:
//
// If there's no random pointer you can iterate through the nodes and create a copy of each node.  With the random
// pointer you'll have to maintain a map of original node to copied node so you can assign the random pointers later.
//
// First iterate through the list once to make copies of each node in a map.  Then iterate again and assign the next
// and random pointers.
function copyRandomList(head: _Node | null): _Node | null {
  if (head === null) {
    return null;
  }

  type Original = _Node;
  type Copy = _Node;
  const map = new Map<Original, Copy>();

  // First create a map of each node to its copy.
  let node: _Node | null = head;
  while (node !== null) {
    map.set(node, new _Node(node.val));
    node = node.next;
  }

  // Now assign the random pointers.
  node = head;
  while (node !== null) {
    const copy = map.get(node)!;
    copy.next = node.next !== null ? map.get(node.next)! : null;
    copy.random = node.random !== null ? map.get(node.random)! : null;
    node = node.next;
  }

  // Return the head of the list.
  return map.get(head)!;
}
