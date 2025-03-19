# DIFFICULTY: MEDIUM
# ------------------
#
# A linked list of length n is given such that each node contains an additional random pointer, which could point to
# any node in the list, or null.
#
# Construct a deep copy of the list. The deep copy should consist of exactly n brand new nodes, where each new node has
# its value set to the value of its corresponding original node. Both the next and random pointer of the new nodes
# should point to new nodes in the copied list such that the pointers in the original list and copied list represent
# the same list state. None of the pointers in the new list should point to nodes in the original list.
#
# For example, if there are two nodes X and Y in the original list, where X.random --> Y, then for the corresponding
# two nodes x and y in the copied list, x.random --> y.
#
# Return the head of the copied linked list.
#
# The linked list is represented in the input/output as a list of n nodes. Each node is represented as a pair of
# [val, random_index] where:
#
# - val: an integer representing Node.val
# - random_index: the index of the node (range from 0 to n-1) that the random pointer points to, or null if it does not
# point to any node.
#
# Your code will only be given the head of the original linked list.
#
# See https://leetcode.com/problems/copy-list-with-random-pointer
from leetcode.linked_list.common.random_node import Node


class Solution:
    def copyRandomList(self, head: "Node | None") -> "Node | None":
        """
        SOLUTION
        --------

        If there's no random pointer you can iterate through the nodes and create a copy of each node.  With the random
        pointer you'll have to maintain a map of original node to copied node so you can assign the random pointers
        later.

        First iterate through the list once to make copies of each node in a map.  Then iterate again and assign the
        next and random pointers.

        COMPLEXITY
        ----------

        Time complexity is O(n) where n is the number of nodes in the linked list.

        Space complexity is O(n) because we are storing the new nodes in a dictionary.
        """
        if not head:
            return None

        # Create a map of original nodes to new nodes.
        mapping: dict[Node | None, Node] = {}

        # First, create a map of each node to its copy.
        current = head
        while current:
            mapping[current] = Node(current.val)
            current = current.next

        # Second, assign the pointers.
        current = head
        while current:
            copy = mapping[current]
            copy.next = mapping.get(current.next, None)
            copy.random = mapping.get(current.random, None)
            current = current.next

        # Return the head of the copied list.
        return mapping[head]
