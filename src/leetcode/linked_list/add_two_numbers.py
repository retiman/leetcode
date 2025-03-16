# DIFFICULTY: MEDIUM
# ------------------
#
# You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse
# order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
#
# You may assume the two numbers do not contain any leading zero, except the number 0 itself.
#
# See https://leetcode.com/problems/add-two-numbers
from leetcode.linked_list.common.list_node import ListNode


class Solution:
    def addTwoNumbers(self, a: ListNode, b: ListNode) -> ListNode:
        """
        SOLUTION
        --------

        A naive solution of converting the nodes to numbers, adding them, and them, and then reconstructing the linked
        list does work, but is a bunch more code.

        Since the lists are stored in reverse order, you can add the two head nodes, preserving a carry, and create a
        new node, in the same way you would do elementary school addition.

        COMPLEXITY
        ----------

        Time complexity is O(n) where n is the length of the longer linked list.

        Space complexity is O(n) where n is the length of the longer linked list.
        """

        def add(u: ListNode | None, v: ListNode | None, carry: int) -> ListNode | None:
            if not u and not v:
                return ListNode(1) if carry > 0 else None

            # Compute the sum and carry for the current node.
            u_val = u.val if u else 0
            v_val = v.val if v else 0
            sum_val = u_val + v_val + carry
            next_val = sum_val if sum_val < 10 else sum_val - 10

            # Compute the sum for the next node and attach it to this one.
            u_next = u.next if u else None
            v_next = v.next if v else None
            carry_next = 1 if sum_val >= 10 else 0

            node = ListNode()
            node.val = next_val
            node.next = add(u_next, v_next, carry_next)

            return node

        result = add(a, b, 0)

        assert result
        return result
