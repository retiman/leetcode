// DIFFICULTY: Medium
//
// Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
//
// Implement the MinStack class:
//
// MinStack() initializes the stack object.
// void push(int val) pushes the element val onto the stack.
// void pop() removes the element on the top of the stack.
// int top() gets the top element of the stack.
// int getMin() retrieves the minimum element in the stack.
//
// You must implement a solution with O(1) time complexity for each function.
//
// See https://leetcode.com/problems/min-stack/
describe('min stack', () => {
  class MinStack {
    private readonly stack: number[];

    private readonly min: number[];

    constructor() {
      this.stack = [];

      // This stack will contain the same number of elements as the underlying stack, but each element pushed onto it is
      // the minimum value element at the time.
      this.min = [];
    }

    push(x: number): void {
      this.stack.push(x);

      if (this.min.length === 0) {
        this.min.push(x);
        return;
      }

      const smallest = Math.min(x, this.getMin());
      this.min.push(smallest);
    }

    pop(): void {
      this.stack.pop();
      this.min.pop();
    }

    top(): number {
      return this.stack[this.stack.length - 1];
    }

    getMin(): number {
      if (this.min.length === 0) {
        return -Infinity;
      }

      return this.min[this.min.length - 1];
    }
  }

  test('min stack - test case 1', async () => {
    const stack = new MinStack();
    stack.push(-2);
    stack.push(0);
    stack.push(-3);

    expect(stack.getMin()).toBe(-3);

    stack.pop();

    expect(stack.top()).toBe(0);
    expect(stack.getMin()).toBe(-2);
  });
});
