# DIFFICULTY: HARD
#
# Design a data structure to store the strings' count with the ability to return the strings with minimum and maximum
# counts.
#
# Implement the AllOne class:
#
# - AllOne() Initializes the object of the data structure.
# - inc(String key) Increments the count of the string key by 1. If key does not exist in the data structure, insert
#   it with count 1.
# - dec(String key) Decrements the count of the string key by 1. If the count of key is 0 after the decrement, remove
#   it from the data structure. It is guaranteed that key exists in the data structure before the decrement.
# - getMaxKey() Returns one of the keys with the maximal count. If no element exists, return an empty string "".
# - getMinKey() Returns one of the keys with the minimum count. If no element exists, return an empty string "".
#
# Note that each function must run in O(1) average time complexity.
#
# See https://leetcode.com/problems/all-oone-data-structure
import math
from typing import cast


class Node:
    def __init__(self, count: float) -> None:
        # This node represents a count/frequency and the keys that have this count.
        self.count = count
        # A set of keys that have this count.
        self.keys: set[str] = set()
        # For a doubly linked list, the non-sentinel nodes will have both a previous and next node.  Only the sentinel
        # nodes will have a pointer that points to None.
        self.previous: "Node" = cast("Node", None)
        self.next: "Node" = cast("Node", None)


class AllOne:
    """
    SOLUTION
    --------

    Use a doubly linked list and hashmap to store the keys and their counts.  Each node in the linked list will
    represent a specific count, and the keys in that node have the count.

    The doubly linked list will let us quickly find the min and max counts, and the hashmap will let us quickly find any
    key for inc/dec.

    COMPLEXITY
    ----------

    Time complexity is O(1) for all operations.

    Space complexity is O(n) where n is the number of keys in the data structure.
    """

    def __init__(self) -> None:
        # Map of key -> node.
        self.nodes: dict[str, Node] = {}
        # We'll use this linked list to quickly find the min and max counts, which will lead us to the min and max keys.
        # Create two sentinel nodes to simplify the logic.
        self.head = Node(-math.inf)
        self.tail = Node(math.inf)
        self.head.next = self.tail
        self.tail.previous = self.head

    def inc(self, key: str) -> None:
        # If our key DOES NOT exist in the data structure, there are two cases:
        #
        # 1. The first node has count of 1.
        # 2. The first node does not have a count of 1.
        if key not in self.nodes:
            # Find the first node (this could be the tail, but that's okay).  Note that we choose a node name u so that
            # the subsequent (next) node will be named v.
            u = self.head.next

            # If the first node doesn't have a count of 1, we can't just add the key to it.  Instead, we'll have to
            # create a new node.
            if u.count != 1:
                u = self.__addNodeAfter(self.head, 1)

            # Now that we have the correct node (it cannot be the tail anymore).
            u.keys.add(key)
            self.nodes[key] = u
            return

        # If our key DOES exist in the data structure, things get more complicated.
        #
        # 1. Find the current node with count k.
        # 2. Find the next node with count k + 1, or create it if it doesn't exist, then add the key to it.
        # 3. Remove the key from the current node, and remove the current node if it has no keys.
        # 5. Update the key -> node mapping.
        u = self.nodes[key]

        # Find the next node, or create it with the incremented count.  If the next node has a count of k + 1, then we
        # have found the correct one.  Otherwise, we need to create a new node.
        v = u.next
        if v.count != u.count + 1:
            v = self.__addNodeAfter(u, u.count + 1)
        v.keys.add(key)

        # Remove the key from the current node, and remove the current node if it has no keys.
        u.keys.remove(key)
        if not u.keys:
            self.__removeNode(u)

        # Update the key -> node mapping.
        self.nodes[key] = v

    def dec(self, key: str) -> None:
        # The problem guarantees that our key WILL exist in the data structure.
        #
        # 1. Find the current node with count k.
        # 2. Find the previous node with count k - 1, or create it if it doesn't exist, then add the key to it.
        # 3. Remove the key from the current node, and remove the current node if it has no keys.
        # 4. Update the key -> node mapping.
        #
        # Note that we choose a name v for the current node, and u for the previous node.
        v = self.nodes[key]

        # Find the previous node, or create it with the decremented count.  If the previous node has a count of k - 1,
        # then we have found the correct one.  Otherwise, we need to create a new node.
        #
        # Unless!  If k - 1 is 0, we don't create a new node, because we don't store keys with a count of 0.  Instead,
        # we just remove the key from the current node and remove the current node if it has no keys.
        u = v.previous
        if v.count == 1:
            self.__removeKey(key)
            return
        # Otherwise, proceed in the same way as we handled inc.
        elif u.count != v.count - 1:
            u = self.__addNodeAfter(v.previous, v.count - 1)
        u.keys.add(key)

        # Remove the key from the current node, and remove the current node if it has no keys.
        v.keys.remove(key)
        if not v.keys:
            self.__removeNode(v)

        # Update the key -> node mapping.
        self.nodes[key] = u

    def getMinKey(self) -> str:
        if not self.nodes:
            return ""

        return next(iter(self.head.next.keys))

    def getMaxKey(self) -> str:
        if not self.nodes:
            return ""

        return next(iter(self.tail.previous.keys))

    def __addNodeAfter(self, prev: Node, count: float) -> Node:
        node = Node(count)

        # Line up the nodes in the desired order: a -> b -> c
        a = prev
        b = node
        c = prev.next

        # Update pointers for node b.
        b.previous = a
        b.next = c

        # Update pointers for nodes a and c.
        a.next = b
        c.previous = b

        return node

    def __removeNode(self, node: Node) -> None:
        # Line up the nodes in the desired order: a -> b -> c
        a = node.previous
        c = node.next

        # Update pointers for nodes a and c.
        a.next = c
        c.previous = a

    def __removeKey(self, key: str) -> None:
        if key not in self.nodes:
            return

        # Remove the key from the node.
        node = self.nodes[key]
        node.keys.remove(key)

        # Remove the node itself if it has no keys.
        self.nodes.pop(key)
        if not node.keys:
            self.__removeNode(node)
