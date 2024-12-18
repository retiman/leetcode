// DIFFICULTY: Hard
//
// Design a max stack data structure that supports the stack operations and supports finding the stack's maximum element.
//
// Implement the MaxStack class:
//
// - MaxStack() Initializes the stack object.
// - void push(int x) Pushes element x onto the stack.
// - int pop() Removes the element on top of the stack and returns it.
// - int top() Gets the element on the top of the stack without removing it.
// - int peekMax() Retrieves the maximum element in the stack without removing it.
// - int popMax() Retrieves the maximum element in the stack and removes it. If there is more than one maximum element,
//   only remove the top-most one.
//
// You must come up with a solution that supports O(1) for each top call and O(logn) for each other call.
//
// See https://leetcode.com/problems/max-stack/
const { PriorityQueue } = require('@datastructures-js/priority-queue');

describe('max stack', () => {
  interface StackNode {
    key: number;
    value: number;
    previous: StackNode;
    next: StackNode;
  }

  class MaxStack {
    private readonly deleted: Set<number>;

    // We want a max priority queue, but we need to determine the max by comparing both a key and a value.  This can
    // only be done by supplying a custom comparator, so instead of using a MaxPriorityQueue, we'll use a PriorityQueue
    // that takes a custom comparator.
    //
    // LeetCode has a ton of issues with this; it seems that the type information is unavailable for PriorityQueue and
    // related classes.  This means that if you attempt to declare a PriorityQueue with generics, it will not compile
    // in LeetCode.
    //
    // Type inference using new PriorityQueue() does work without issues, since LeetCode will infer the correct type.
    // However, if you try to use the correct type here, you'll get a compilation error on your end.  To get around this
    // we are just going to set the type to 'any'.
    //
    // We also have to use require() over import here, or else we'll again be thwarted by type checks.
    //
    // Oh, one more thing, when using PriorityQueue in this way, the enqueue(), dequeue(), and front() methods now
    // return the element directly when using PriorityQueue in this way.  Don't reference .element or .priority; it
    // won't exist.
    //
    // private readonly heap: PriorityQueue<StackNode>;
    private readonly heap: any;

    private keys: number;

    private head: StackNode;

    private tail: StackNode;

    constructor() {
      this.keys = 0;
      this.deleted = new Set();
      this.heap = new PriorityQueue({
        compare: (a: StackNode, b: StackNode) => {
          // Because we want to pop max the top most max element, we should compare their keys in the case of a tie;
          // that is because the higher key will be on top of the stack.
          if (a.value === b.value) {
            return b.key - a.key;
          }

          return b.value - a.value;
        }
      });

      // Create sentinel values for head and tail so we don't have to deal with null pointers.
      const head: Partial<StackNode> = {
        key: Number.MIN_SAFE_INTEGER,
        value: Number.MIN_SAFE_INTEGER
      };
      const tail: Partial<StackNode> = {
        key: Number.MIN_SAFE_INTEGER,
        value: Number.MIN_SAFE_INTEGER
      };

      head.next = tail as StackNode;
      tail.previous = head as StackNode;
      this.head = head as StackNode;
      this.tail = tail as StackNode;
    }

    push(x: number): void {
      const node: StackNode = {
        key: this.keys++,
        value: x,
        previous: this.head,
        next: this.tail
      };
      this.heap.enqueue(node, x);

      // If we have no elements between head and tail, insert this node between them as the only element.
      if (this.head.next === this.tail) {
        node.previous = this.head;
        node.next = this.tail;
        this.head.next = node;
        this.tail.previous = node;
        return;
      }

      // If we do have an element between head and tail, add this node after that one.
      const previous = this.tail.previous;

      node.previous = previous;
      node.next = this.tail;

      previous.next = node as StackNode;
      this.tail.previous = node;
    }

    pop(): number {
      if (this.head.next === this.tail) {
        throw new Error('nothing to pop');
      }

      const node = this.tail.previous;
      const previous = node.previous;
      const next = node.next;
      previous.next = next;
      next.previous = previous;

      // In contrast with removing from a doubly linked list, it's going to be very hard to remove from the middle of
      // the heap.
      //
      // Instead, we'll cheat and just save this deletion for later.
      this.deleted.add(node.key);
      return node.value;
    }

    top(): number {
      if (this.head.next === this.head) {
        throw new Error('nothing on top');
      }

      return this.tail.previous.value;
    }

    peekMax(): number {
      if (this.heap.isEmpty()) {
        throw new Error('nothing to peek max');
      }

      this.deleteMax();
      const node = this.heap.front();
      return node.value;
    }

    popMax(): number {
      if (this.heap.isEmpty()) {
        throw new Error('nothing to pop max');
      }

      this.deleteMax();
      if (this.heap.isEmpty()) {
        throw new Error('nothing to pop max');
      }

      const node = this.heap.dequeue();
      const previous = node.previous;
      const next = node.next;
      previous.next = next;
      next.previous = previous;

      return node.value;
    }

    private deleteMax() {
      while (!this.heap.isEmpty()) {
        const max = this.heap.front();
        if (!this.deleted.has(max.key)) {
          return;
        }

        this.heap.dequeue();
        this.deleted.delete(max.key);
      }
    }
  }

  test('max stack - test case 1', async () => {
    const stack = new MaxStack();

    stack.push(5);
    stack.push(1);
    stack.push(5);

    expect(stack.top()).toBe(5);
    expect(stack.popMax()).toBe(5);
    expect(stack.top()).toBe(1);
    expect(stack.peekMax()).toBe(5);
    expect(stack.pop()).toBe(1);
    expect(stack.top()).toBe(5);
  });
});
