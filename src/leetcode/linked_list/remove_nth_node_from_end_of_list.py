# DIFFICULTY: MEDIUM
# ------------------
#
# Given the head of a linked list, remove the nth node from the end of the list and return its head.
#
# See https://leetcode.com/problems/remove-nth-node-from-end-of-list
from leetcode.linked_list.common.list_node import ListNode


class Solution:
    def removeNthFromEnd(self, head: "ListNode | None", n: int) -> "ListNode | None":
        """
        SOLUTION
        --------

        The naive solution that accomplishes this in one iteration is to throw all the nodes into an array.  Then we can
        easily find the nth node from the end of the array by indexing into it.  This solution requires O(m) space,
        where m is the length of the list.

        There is a more efficient solution that uses two pointers.  The first pointer will be n nodes ahead of the
        second pointer.  Move both pointers until the first pointer reaches the end of the list.  At this point, the
        second pointer will be pointing to the node that we want to remove.

        The problem says we won't have invalid inputs, so ignore pyright warnings.

        COMPLEXITY
        ----------

        Time complexity is O(m) where time because we are iterating through the list once.

        Space complexity is O(1).
        """
        # Create a sentinel head node to simplify the logic.
        sentinel = ListNode(-1)
        sentinel.next = head
        faster: ListNode | None = sentinel
        slower: ListNode | None = sentinel

        # Move the faster pointer n nodes ahead of the slower pointer.
        for _ in range(n + 1):
            faster = faster.next  # pyright: ignore

        # Move both pointers until the faster pointer reaches the end of the list.
        while faster:
            faster = faster.next  # pyright: ignore
            slower = slower.next  # pyright: ignore

        # Remove the slower node from the list.
        slower.next = slower.next.next  # pyright: ignore
        return sentinel.next
