# DIFFICULTY: EASY
#
# You are given the heads of two sorted linked lists list1 and list2.
#
# Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.
#
# Return the head of the merged linked list.
#
# See https://leetcode.com/problems/merge-two-sorted-lists
from leetcode.linked_list.common.list_node import ListNode


class Solution:
    def mergeTwoLists(self, list1: "ListNode | None", list2: "ListNode | None") -> "ListNode | None":
        """
        SOLUTION
        --------

        Start with a sentinel node and continue appending the smaller value of the two lists to the merged list.  If
        there are any remaining nodes in either list, append them to the end of the list (they are already sorted).

        COMPLEXITY
        ----------

        Time complexity is O(n) where n is the number of nodes in the merged list.

        Space complexity is O(1).
        """
        # Create a sentinel head node to simplify the logic.
        head = ListNode(-1)
        node = head

        # While there are nodes in both list1 and list2, compare the values and append the smaller value to the merged
        # list.
        while list1 and list2:
            if list1.val < list2.val:
                node.next = list1
                list1 = list1.next
            else:
                node.next = list2
                list2 = list2.next
            node = node.next

        # If there are any remaining nodes in list1 or list2, append them to the merged list; they are already sorted.
        if list1:
            node.next = list1
        if list2:
            node.next = list2

        # Return the head node of the merged list.
        return head.next
