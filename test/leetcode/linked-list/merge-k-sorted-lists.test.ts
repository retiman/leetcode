// DIFFICULTY: Hard
//
// You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
//
// Merge all the linked-lists into one sorted linked-list and return it.
//
// See https://leetcode.com/problems/merge-k-sorted-lists/
import { ListNode, list2node, node2list } from '../../../src/leetcode/linked-list/merge-k-sorted-lists';

describe('merge k sorted lists', () => {
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

  function __merge(xs: (number[] | null)[]) {
    const lists = xs.map(x => list2node(x));
    const merged = mergeKLists(lists);
    return merged === null ? null : node2list(merged);
  }

  test('merge trivial', async () => {
    expect(__merge([null, null])).toBeNull();
    expect(__merge([[1], null])).toStrictEqual([1]);
    expect(__merge([null, [1]])).toStrictEqual([1]);
  });

  test('merge single', async () => {
    expect(__merge([[1], [2]])).toStrictEqual([1, 2]);
  });

  test('merge case 1', async () => {
    const lists = [
      [1, 2, 4],
      [1, 3, 4]
    ];
    const merged = [1, 1, 2, 3, 4, 4];
    expect(__merge(lists)).toStrictEqual(merged);
  });

  test('merge case 2', async () => {
    const lists = [
      [1, 4, 5],
      [1, 3, 4],
      [2, 6]
    ];
    const merged = [1, 1, 2, 3, 4, 4, 5, 6];
    expect(__merge(lists)).toStrictEqual(merged);
  });
});
