// DIFFICULTY: Medium
//
// Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.
//
// Implement the LRUCache class:
//
// LRUCache(int capacity)
//   Initialize the LRU cache with positive size capacity.
// int get(int key)
//   Return the value of the key if the key exists, otherwise return -1.
// void put(int key, int value)
//   Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of
//   keys exceeds the capacity from this operation, evict the least recently used key.
//
// The functions get and put must each run in O(1) average time complexity.
//
// See https://leetcode.com/problems/lru-cache/
describe('lru cache', () => {
  // This class definition is provided by LeetCode and must be implemented by you.  An LRU cache can be implemented
  // using a hashmap and a linked list.
  class LRUCache {
    private head?: Node;

    private last?: Node;

    private map: Map<number, Node>;

    private capacity: number;

    constructor(capacity: number) {
      this.map = new Map();
      this.capacity = capacity;
    }

    get(key: number): number {
      if (!this.map.has(key)) {
        return -1;
      }

      // Here, we can be assured that the key exists because we also store the key on the node.  If we want to avoid
      // storing the key on the node, we can just delete the last element from the list and then check for an undefined
      // value here in case we deleted the key from being at capacity.
      const node = this.map.get(key)!;

      // If the node is already at the front of the list, just remove it and return the value.
      if (node.key === this.head?.key) {
        return node.value;
      }

      // Detach the node from its position in the list, and connect the previous and next nodes to each other instead.
      this.unlink(node);

      // Move the node to the front of the list.
      this.unshift(node);

      return node.value;
    }

    put(key: number, value: number): void {
      // If we already have this value in the map, just update it and don't bother mucking with the capacity.
      if (this.map.has(key)) {
        const node = this.map.get(key)!;
        node.value = value;

        // Call get to update timestamp on the node, but throw away the result.
        const _ = this.get(key);
        return;
      }

      // If there's no capacity, we don't have to do anything.
      if (this.capacity <= 0) {
        return;
      }

      // If we are at capacity, we will first have to evict an entry from the cache by finding the last accessed element
      // from our list.
      if (this.map.size === this.capacity) {
        this.pop();
      }

      const node = new Node(key, value);
      this.map.set(key, node);

      // I am assuming that a put will also update the last accessed timestamp of the node, so move it to the front of
      // the list.
      this.unshift(node);
    }

    // Remove a node that is NOT the head node.
    private unlink(node: Node) {
      // If this was the last node, update the last pointer.
      if (node.key === this.last?.key) {
        this.last = node.previous!;
        this.last.next = undefined;
        return;
      }

      // Otherwise, this is not the last node and not the head node, so stitch the previous and next nodes together.
      const left = node.previous!;
      const right = node.next;
      left.next = right;
      if (right !== undefined) {
        right.previous = left;
      }
    }

    // Unshift a node that is NOT the head node.
    private unshift(node: Node) {
      node.previous = undefined;

      if (this.head === undefined) {
        this.head = node;
      } else {
        this.head.previous = node;
        node.next = this.head;
        this.head = node;
      }

      if (this.last === undefined) {
        this.last = node;
      }
    }

    // Unlink the last node (also possibly the head node) and remove it from the map.
    private pop() {
      const node = this.last;

      if (node === undefined) {
        return;
      }

      this.map.delete(node.key);

      // If this was the head node, just set both nodes to undefined and be done with it.
      if (node.key === this.head?.key) {
        this.head = undefined;
        this.last = undefined;
        return;
      }

      // Otherwise, unlink the last node.
      this.unlink(node);
    }
  }

  class Node {
    public next?: Node;

    public previous?: Node;

    constructor(
      public readonly key: number,
      public value: number
    ) {}
  }

  test('test case 1', async () => {
    const cache = new LRUCache(2);

    cache.put(1, 1);
    cache.put(2, 2);

    expect(cache.get(1)).toBe(1);

    cache.put(3, 3);

    expect(cache.get(2)).toBe(-1);

    cache.put(4, 4);

    expect(cache.get(1)).toBe(-1);
    expect(cache.get(3)).toBe(3);
    expect(cache.get(4)).toBe(4);
  });

  test('test case 2', async () => {
    const cache = new LRUCache(2);

    expect(cache.get(2)).toBe(-1);
    expect(cache.get(2)).toBe(-1);

    cache.put(2, 6);

    expect(cache.get(1)).toBe(-1);

    cache.put(1, 5);
    cache.put(1, 2);

    expect(cache.get(1)).toBe(2);
    expect(cache.get(2)).toBe(6);
  });

  test('test case 3', async () => {
    const cache = new LRUCache(3);

    cache.put(1, 1);
    cache.put(2, 2);
    cache.put(3, 3);
    cache.put(4, 4);

    expect(cache.get(4)).toBe(4);
    expect(cache.get(3)).toBe(3);
    expect(cache.get(2)).toBe(2);
    expect(cache.get(1)).toBe(-1);

    cache.put(5, 5);

    expect(cache.get(1)).toBe(-1);
    expect(cache.get(2)).toBe(2);
    expect(cache.get(3)).toBe(3);
    expect(cache.get(4)).toBe(-1);
    expect(cache.get(5)).toBe(5);
  });
});
