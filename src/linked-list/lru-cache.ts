// DIFFICULTY: MEDIUM
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
// See {@link https://leetcode.com/problems/lru-cache/}
export { LRUCache };

// SOLUTION:
//
// This class definition is provided by LeetCode and must be implemented by you.  An LRU cache can be implemented
// using a hashmap and a linked list.
class LRUCache {
  private map: Map<number, Node>;
  private capacity: number;
  private head: Node;
  private tail: Node;

  constructor(capacity: number) {
    this.map = new Map();
    this.capacity = capacity;

    // These are sentinel nodes that will never be directly accessed, but help us avoid certain undefined checks.
    this.head = new Node(-1, -1);
    this.tail = new Node(-1, -1);
    this.head.next = this.tail;
    this.tail.previous = this.head;
  }

  get(key: number): number {
    if (!this.map.has(key)) {
      return -1;
    }

    // Here, we can be assured that the key exists because we also store the key on the node.  If we want to avoid
    // storing the key on the node, we can just delete the last element from the list and then check for an undefined
    // value here in case we deleted the key from being at capacity.
    const node = this.map.get(key)!;
    this.moveToHead(node);
    return node.value;
  }

  put(key: number, value: number): void {
    // If we already have this value in the map, just update it and don't bother mucking with the capacity.
    if (this.map.has(key)) {
      const node = this.map.get(key)!;
      this.moveToHead(node);
      node.value = value;
      return;
    }

    const node = new Node(key, value);
    this.map.set(key, node);
    this.addToHead(node);

    // If we've exceed capacity, we have to remove the least used element, aka the tail.  At this point, there is
    // guaranteed to be at least one other element in the list because we just added one.  Also, unless the capacity
    // is 0, we will always at least have another.
    //
    // So we can safely access this.tail.previous!
    if (this.map.size > this.capacity) {
      const tail = this.tail.previous!;
      this.removeNode(tail);
      this.map.delete(tail.key);
    }
  }

  private addToHead(node: Node): void {
    const a = this.head;
    const b = node;
    const c = this.head.next;

    // Updates the pointers for the node itself.
    b.next = c;
    b.previous = a;

    // Inserts the node at the front of the list.
    a.next = b;
    c!.previous = b;
  }

  private moveToHead(node: Node): void {
    this.removeNode(node);
    this.addToHead(node);
  }

  private removeNode(node: Node): void {
    const b = node;
    const a = b.previous!;
    const c = b.next!;

    a.next = c;
    c.previous = a;
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
