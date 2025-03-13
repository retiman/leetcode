# DIFFICULTY: HARD
#
# You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
#
# Merge all the linked-lists into one sorted linked-list and return it.
#
# See https://leetcode.com/problems/merge-k-sorted-lists
from heapq import heappop, heappush
from leetcode.heap.common.list_node import ListNode


class Solution:
    def mergeKLists(self, lists: list[ListNode | None]) -> ListNode | None:
        """
        SOLUTION
        --------

        Instead of only 2 lists, we have to merge k lists.  The naive way is to do a linear scan of the head of every
        list to find the smallest element then create a new list node with that element and append it to the result
        list.

        However, we can do better by using a heap to store the head of each list so we can always find the minimum value
        without a linear scan.  Additionally, the problem does not say we cannot reuse the input lists, so we do not
        have to create new list nodes.

        COMPLEXITY
        ----------

        Time complexity is O(n log k), where n is the number of nodes and there are k lists, so each enqueuing operation
        will take O(log k) time.  However, we are going to do this for every node in the list, so the total time
        complexity is O(n log k).  The naive approach with a linear scan would be O(n * k).

        Space complexity is O(k) because we are storing the head of each list in the heap, and we do not create new list
        nodes.
        """
        # Use a heap to store the head of each list so we can always find the minimum value to add to the result list
        # without resorting to a linear scan.
        #
        # Store (value, id, ListNode) tuples in the heap because we need to handle dupes.  In case of dupes, Python will
        # try to compare the second value of the tuple.  If the second value is a ListNode, it won't know how to compare
        # it.  To fix this, store some unique ID for the ListNode as the second value so the third value will never be
        # compared.
        min_heap: list[tuple[int, int, ListNode]] = []
        for head in lists:
            if head:
                heappush(min_heap, (head.val, id(head), head))

        # As we keep advancing the current node, we'll lose track of the head.  Let's have a sentinel node so that we
        # can always keep track of where the list begins.
        sentinel = ListNode(-1)
        current = sentinel

        while min_heap:
            (_, _, smallest) = heappop(min_heap)

            # Advance the current node and push the smallest element in.
            current.next = smallest
            current = current.next

            # Now, advance the smallest node to the next value.
            if smallest.next:
                next = smallest.next
                heappush(min_heap, (next.val, id(next), next))

        # The sentinel node will point to the head of the list, so we did not lose it.
        return sentinel.next
