# DIFFICULTY: MEDIUM
# ------------------
#
# Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
#
# Implement the MinStack class:
#
# MinStack() initializes the stack object.
# void push(int val) pushes the element val onto the stack.
# void pop() removes the element on the top of the stack.
# int top() gets the top element of the stack.
# int getMin() retrieves the minimum element in the stack.
#
# You must implement a solution with O(1) time complexity for each function.
#
# See https://leetcode.com/problems/min-stack
class MinStack:
    def __init__(self):
        """
        SOLUTION
        --------

        Use one stack to store the values and another stack to store the minimum values.

        It appears that the problem will not call your solution with an empty stack, so we don't need to worry about that
        case.

        COMPLEXITY
        ----------

        Time complexity is O(1) for all operations.

        Space complexity is O(n) where n is the number of elements in the stack.
        """
        self.stack: list[int] = []
        self.min_values: list[int] = []

    def push(self, value: int) -> None:
        self.stack.append(value)

        if not self.min_values:
            self.min_values.append(value)
            return

        min_value = min(value, self.getMin())
        self.min_values.append(min_value)

    def pop(self) -> None:
        self.stack.pop()
        self.min_values.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.min_values[-1]
