# DIFFICULTY: HARD
#
# Design a max stack data structure that supports the stack operations and supports finding the stack's maximum element.
#
# Implement the MaxStack class:
#
# - MaxStack() Initializes the stack object.
# - void push(int x) Pushes element x onto the stack.
# - int pop() Removes the element on top of the stack and returns it.
# - int top() Gets the element on the top of the stack without removing it.
# - int peekMax() Retrieves the maximum element in the stack without removing it.
# - int popMax() Retrieves the maximum element in the stack and removes it. If there is more than one maximum element,
#   only remove the top-most one.
#
# You must come up with a solution that supports O(1) for each top call and O(logn) for each other call.
#
# See https://leetcode.com/problems/max-stack
from heapq import heappop, heappush


class StackNode:
    # The problem itself states that the smallest value we can get is -10^7.  This definition avoids having to declare
    # the type of a node key/value to be float for float("-inf").
    MIN_INT_VALUE = -(10**7) - 1

    def __init__(self, key: int, value: int):
        self.key = key
        self.value = value
        self.previous: "StackNode | None" = None
        self.next: "StackNode | None" = None


class MaxStack:
    def __init__(self):
        """
        SOLUTION
        --------

        Use a heap and a doubly linked list to represent the max stack.  Most operations can be performed in O(1) or
        O(log n).  The only challenge is that when popping from the stack, it's easy to remove from the end of the
        linked list, but it's not easy to remove from the middle of the max heap.

        Instead of removing from the max heap immediately, defer the deletion until we perform a peekMax or popMax, and
        check if processing the deferred deletions are required.  If so, perform them there.

        For the purposes of this solution, we won't consider edge cases like popping from an empty stack.  This keeps
        the solution simple.

        COMPLEXITY
        ----------

        Time complexity is O(1) for top and O(log n) for each other call.

        Space complexity is O(n).
        """
        # Because the stack could have multiple duplicate elements, use a unique ID for each node.
        self.keys = 0
        # Because deleting from the middle of a heap is hard, keep track of a set of deletions while popping and defer
        # them for later.
        self.deleted = set()
        # Use a max heap to keep track of max elements.  The heap will have a tuple of (value, key, node) because we
        # want to support dupes, so have the heap order by value first, then the key.
        self.max_heap = []
        # Setup sentinel values for the head and tail so we don't have to check for nulls.
        self.head = StackNode(StackNode.MIN_INT_VALUE, StackNode.MIN_INT_VALUE)
        self.tail = StackNode(StackNode.MIN_INT_VALUE, StackNode.MIN_INT_VALUE)
        self.head.next = self.tail
        self.tail.previous = self.head

    def push(self, value: int) -> None:
        # Add this new node to the linked list.
        node = StackNode(self.keys, value)
        self.keys += 1

        # Push onto the heap, but because this is a max heap, negate the value.  Because the stack might have dupes,
        # we'll want the heap to be ordered by first the value, then the key.
        heappush(self.max_heap, (-value, -node.key, node))

        # Now add this node to the end of the linked list.
        a = self.tail.previous
        b = node
        c = self.tail
        self.__insert_node(a, b, c)

    def pop(self) -> int:
        node = self.tail.previous
        assert node is not None

        # Remove the last element of the linked list.
        self.__delete_node(node)

        # We also need to remove this element from the heap, but this will be difficult as we can't remove arbitrary
        # elements from the middle of the heap.  Instead, we will note the deletion and defer it.
        self.deleted.add(node.key)
        return node.value

    def top(self) -> int:
        assert self.tail.previous is not None
        return self.tail.previous.value

    def peekMax(self) -> int:
        # Since peekMax is allowed to run in O(log n), perform the deferred heap deletions from any previous pops.
        self.__delete_max()

        # Return the front of the of heap.
        (_, _, node) = self.max_heap[0]
        return node.value

    def popMax(self) -> int:
        # Since popMax is allowed to run in O(log n), perform the deferred heap deletions from any previous pops.
        self.__delete_max()

        # Pop off the front of the heap, which is efficient to do so here (we don't have to delete from the middle).
        (_, _, node) = heappop(self.max_heap)

        # Delete from the linked list, which is also efficient to do here.
        self.__delete_node(node)
        return node.value

    def __delete_node(self, b: StackNode | None):
        assert b is not None

        a = b.previous
        c = b.next

        # This shouldn't be necessary, but mypy cannot tell if these values are not None.
        if a and c:
            a.next = c
            c.previous = a

    def __insert_node(self, a: StackNode | None, b: StackNode, c: StackNode | None):
        assert a is not None
        assert b is not None
        assert c is not None

        # Update the pointers around the node.
        a.next = b
        c.previous = b

        # Update the pointers for the node itself.
        b.previous = a
        b.next = c

    def __delete_max(self):
        while self.max_heap:
            (_, _, node) = self.max_heap[0]

            # If the front of the heap is actually something we have deleted, then any peekMax or popMax operation will
            # return the wrong value.  If that is the case, remove them from the heap in an efficient way right now.
            if node.key in self.deleted:
                heappop(self.max_heap)
                self.deleted.remove(node.key)
            # If the front of the heap hasn't been deleted, then we don't have to do anything as peekMax or popMax will
            # still be valid.
            else:
                return
