# DIFFICULTY: MEDIUM
# ------------------
#
# Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.
#
# Implement the LRUCache class:
#
# LRUCache(int capacity)
#   Initialize the LRU cache with positive size capacity.
# int get(int key)
#   Return the value of the key if the key exists, otherwise return -1.
# void put(int key, int value)
#   Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of
#   keys exceeds the capacity from this operation, evict the least recently used key.
#
# The functions get and put must each run in O(1) average time complexity.
#
# See https://leetcode.com/problems/lru-cache
from typing import cast


class Node:
    def __init__(self, key: int, value: int) -> None:
        self.key = key
        self.value = value
        self.previous: "Node" = cast("Node", None)
        self.next: "Node" = cast("Node", None)


class LRUCache:
    def __init__(self, capacity: int) -> None:
        """
        SOLUTION
        --------

        This problem can be solved using a combination of a doubly linked list and a hashmap.

        COMPLEXITY
        ----------

        Time complexity is O(1) for all operations.

        Space complexity is O(n) where n is the number of keys in the data structure.
        """
        self.mapping: dict[int, Node] = {}
        self.capacity = capacity

        # Create two sentinel nodes to simplify the logic.
        self.head = Node(-1, -1)
        self.tail = Node(-1, -1)
        self.head.next = self.tail
        self.tail.previous = self.head

    def get(self, key: int) -> int:
        if key not in self.mapping:
            return -1

        node = self.mapping[key]
        self.__updateTimestamp(node)
        return node.value

    def put(self, key: int, value: int) -> None:
        if key in self.mapping:
            node = self.mapping[key]
            node.value = value
            self.__updateTimestamp(node)
            return

        # If the key isn't in the map, we need to add it.
        node = Node(key, value)
        self.mapping[key] = node
        self.__addLeftNode(node)

        # If we've exceeded the capacity, remove the least recently used key.
        if len(self.mapping) > self.capacity:
            node = self.tail.previous
            self.mapping.pop(node.key)
            self.__removeNode(node)

    def __removeNode(self, node: Node) -> None:
        # Line up the node pointers in the desired order: a -> b -> c.
        b = node
        a = b.previous
        c = b.next

        a.next = c
        c.previous = a

    def __addLeftNode(self, node: Node) -> None:
        # Line up the node pointers in the desired order: a -> b -> c.
        a = self.head
        b = node
        c = a.next

        # Update the pointers for the node itself.
        b.previous = a
        b.next = c

        # Update the pointers for the surrounding nodes.
        a.next = b
        c.previous = b

    def __updateTimestamp(self, node: Node) -> None:
        # Update the timestamp by moving the node to the front of the list.  Moving to the front of the list can be
        # simulated by removing the node then adding it to the front.
        self.__removeNode(node)
        self.__addLeftNode(node)
