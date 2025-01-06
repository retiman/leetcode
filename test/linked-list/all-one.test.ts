// DIFFICULTY: HARD
//
// Design a data structure to store the strings' count with the ability to return the strings with minimum and maximum
// counts.
//
// Implement the AllOne class:
//
// - AllOne() Initializes the object of the data structure.
// - inc(String key) Increments the count of the string key by 1. If key does not exist in the data structure, insert
//   it with count 1.
// - dec(String key) Decrements the count of the string key by 1. If the count of key is 0 after the decrement, remove
//   it from the data structure. It is guaranteed that key exists in the data structure before the decrement.
// - getMaxKey() Returns one of the keys with the maximal count. If no element exists, return an empty string "".
// - getMinKey() Returns one of the keys with the minimum count. If no element exists, return an empty string "".
//
// Note that each function must run in O(1) average time complexity.
//
// See https://leetcode.com/problems/all-oone-data-structure/
describe('all O`one data structure', () => {
  // For some reason, LeetCode does not permit the names TreeNode or ListNode; these interfaces are
  // included for you somewhere...
  interface OneNode {
    count: number;
    keys: Set<string>;
    previous: OneNode;
    next: OneNode;
  }

  class AllOne {
    private readonly nodes: Map<string, OneNode>;

    private head: OneNode;

    private tail: OneNode;

    constructor() {
      this.nodes = new Map();

      // It's not necessary to have these sentinel values, but it makes things simpler in that you don't have to worry
      // about undefined at all.  The head and tail will refer to head and tail of the list, while min and max will
      // refer to nodes that would've otherwise been the min and max values.
      const head: Partial<OneNode> = {
        count: Number.MIN_SAFE_INTEGER,
        keys: new Set(),
        previous: undefined,
        next: undefined
      };
      const tail: Partial<OneNode> = {
        count: Number.MAX_SAFE_INTEGER,
        keys: new Set(),
        previous: undefined,
        next: undefined
      };

      head.next = tail as OneNode;
      tail.previous = head as OneNode;

      this.head = head as OneNode;
      this.tail = tail as OneNode;
    }

    inc(key: string): void {
      // Node is present; move key from our node to next one.
      if (this.nodes.has(key)) {
        const node = this.nodes.get(key)!;
        // Next node count === count + 1; just add to the next node and update.  Note that head/tail have min/max values
        // so this logic encompasses it.
        if (node.next.count === node.count + 1) {
          node.keys.delete(key);
          node.next.keys.add(key);
          this.nodes.set(key, node.next);
          this.cleanup(node);
          return;
        }

        // Next node count < count + 1; add a new node.
        const next = this.insertKeyBetween(node, key, node.next);
        next.count = node.count + 1;

        // Delete the key from current node and possibly unlink the node.
        node.keys.delete(key);
        this.cleanup(node);
        return;
      }

      // No nodes at all; inserting new node as min/max node.
      if (this.head.next === this.tail) {
        this.insertKeyBetween(this.head, key, this.tail);
        return;
      }

      // At least one node is present, and node has count === 1 as well; update that node.
      if (this.head.next.count === 1) {
        const node = this.head.next;
        node.keys.add(key);
        this.nodes.set(key, node);
        return;
      }

      // At least one node is present, and node has count > 1, insert before that node.
      this.insertKeyBetween(this.head, key, this.head.next);
    }

    dec(key: string): void {
      // Problem says this is guaranteed to be present.
      const node = this.nodes.get(key)!;

      // Did we decrement to zero?  Just delete the key from the node altogether.
      if (node.count === 1) {
        node.keys.delete(key);
        this.nodes.delete(key);
        this.cleanup(node);
        return;
      }

      // The previous node has count === count - 1, just move the key from our node to the previous one.
      if (node.previous.count === node.count - 1) {
        const { previous } = node;
        previous.keys.add(key);
        this.nodes.set(key, previous);

        node.keys.delete(key);
        this.cleanup(node);
        return;
      }

      // The previous node has count too low; we need to make a new node for it.
      const previous = this.insertKeyBetween(node.previous, key, node);
      previous.count = node.count - 1;

      // Delete the key and cleanup the node.
      node.keys.delete(key);
      this.cleanup(node);
    }

    getMaxKey(): string {
      if (this.head.next === this.tail) {
        return '';
      }

      return this.tail.previous.keys.values().next().value!;
    }

    getMinKey(): string {
      if (this.head.next === this.tail) {
        return '';
      }

      return this.head.next.keys.values().next().value!;
    }

    private insertKeyBetween(previous: OneNode, key: string, next: OneNode): OneNode {
      const node: OneNode = {
        count: 1,
        keys: new Set(),
        previous,
        next
      };

      node.keys.add(key);
      this.nodes.set(key, node);

      this.insertNodeBetween(previous, node, next);
      return node;
    }

    private insertNodeBetween(previous: OneNode, node: OneNode, next: OneNode) {
      node.previous = previous;
      node.next = next;

      previous.next = node;

      next.previous = node;
    }

    private cleanup(node: OneNode) {
      const { previous } = node;
      const { next } = node;

      if (node === this.head || node === this.tail) {
        return;
      }

      if (node.keys.size > 0) {
        return;
      }

      previous.next = next;
      next.previous = previous;
    }
  }

  test('all one data structure - test case 1', async () => {
    const allone = new AllOne();
    allone.inc('hello');
    allone.inc('hello');

    expect(allone.getMaxKey()).toBe('hello');
    expect(allone.getMinKey()).toBe('hello');

    allone.inc('leet');

    expect(allone.getMaxKey()).toBe('hello');
    expect(allone.getMinKey()).toBe('leet');
  });

  test('all one data structure - test case 2', async () => {
    const allone = new AllOne();
    allone.inc('a');
    allone.inc('b');
    allone.inc('b');
    allone.inc('c');
    allone.inc('c');
    allone.inc('c');
    allone.dec('b');
    allone.dec('b');

    expect(allone.getMinKey()).toBe('a');

    allone.dec('a');

    expect(allone.getMaxKey()).toBe('c');
    expect(allone.getMinKey()).toBe('c');
  });
});
