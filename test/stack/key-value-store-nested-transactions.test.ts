// DIFFICULTY: Medium
//
// Implement a key-value store with the following functionality:
//
// - get(key: string)
// - set(key: string, value: number)
// - delete(key: string)
// - begin() starts a transaction
// - commit() commits a transaction
// - rollback() rolls back a transaction
//
// This structure supports nested transactions, and the topmost transaction should be able to see the values in the
// transactions below it.
//
// NOTE: This is not an official LeetCode question, but it was asked by Cruise and Bloomberg (sometimes with nested
// transactions and sometimes without).
//
// See https://leetcode.com/discuss/interview-question/279913/Bloomberg-or-Onsite-or-Key-Value-Store-with-transactions
describe('key value store with nested transactions', () => {
  class KeyValueStore {
    private readonly stack: Map<string, number | null>[];

    private readonly map: Map<string, number>;

    constructor() {
      this.stack = [];
      this.map = new Map();
    }

    public get(key: string): number | undefined {
      if (this.stack.length === 0) {
        return this.map.get(key);
      }

      let frame = this.stack.length - 1;
      while (frame >= 0) {
        if (this.stack[frame].has(key)) {
          return this.stack[frame].get(key) ?? undefined;
        }

        frame--;
      }

      return undefined;
    }

    public set(key: string, value: number): void {
      if (this.stack.length === 0) {
        this.map.set(key, value);
        return;
      }

      this.stack[this.stack.length - 1].set(key, value);
    }

    public delete(key: string): void {
      if (this.stack.length === 0) {
        this.map.delete(key);
        return;
      }

      this.stack[this.stack.length - 1].set(key, null);
    }

    public begin(): void {
      this.stack.push(new Map());
    }

    public commit() {
      if (this.stack.length === 0) {
        return;
      }

      const target = this.stack.length === 1 ? this.map : this.stack[this.stack.length - 2];
      const source = this.stack.pop()!;

      for (const [key, value] of source) {
        if (value === null) {
          target.delete(key);
          continue;
        }

        target.set(key, value);
      }
    }

    public rollback() {
      if (this.stack.length === 0) {
        return;
      }

      const map = this.stack.pop()!;
      map.clear();
    }
  }

  test('key value store with nested transactions - test case 1', async () => {
    const store = new KeyValueStore();

    store.set('a', 1);
    store.set('b', 2);
    store.set('c', 3);

    expect(store.get('a')).toBe(1);
    expect(store.get('b')).toBe(2);
    expect(store.get('c')).toBe(3);

    store.delete('c');

    expect(store.get('c')).toBeUndefined();
  });

  test('key value store with nested transactions - test case 2', async () => {
    const store = new KeyValueStore();

    store.set('a', 1);
    store.set('b', 2);
    store.set('c', 3);
    store.begin();
    store.set('a', 10);
    store.set('b', 20);
    store.delete('c');

    expect(store.get('a')).toBe(10);
    expect(store.get('b')).toBe(20);
    expect(store.get('c')).toBeUndefined();

    store.commit();

    expect(store.get('a')).toBe(10);
    expect(store.get('b')).toBe(20);
  });

  test('key value store with nested transactions - test case 3', async () => {
    const store = new KeyValueStore();

    store.set('a', 1);
    store.set('b', 2);
    store.set('c', 3);
    store.begin();
    store.set('a', 10);
    store.set('b', 20);
    store.delete('c');

    expect(store.get('a')).toBe(10);
    expect(store.get('b')).toBe(20);
    expect(store.get('c')).toBeUndefined();

    store.rollback();

    expect(store.get('a')).toBe(1);
    expect(store.get('b')).toBe(2);
    expect(store.get('c')).toBe(3);
  });

  test('key value store with nested transactions - test case 4', async () => {
    const store = new KeyValueStore();

    store.set('a', 1);
    store.begin();
    store.set('a', 10);
    store.begin();
    store.set('a', 100);

    expect(store.get('a')).toBe(100);

    store.commit();

    expect(store.get('a')).toBe(100);

    store.commit();

    expect(store.get('a')).toBe(100);
  });

  test('key value store with nested transactions - test case 5', async () => {
    const store = new KeyValueStore();

    store.set('a', 1);
    store.set('b', 2);
    store.begin();
    store.delete('a');
    store.set('b', 20);
    store.begin();
    store.set('a', 100);
    store.delete('b');

    expect(store.get('a')).toBe(100);
    expect(store.get('b')).toBeUndefined();

    store.rollback();

    expect(store.get('a')).toBeUndefined();
    expect(store.get('b')).toBe(20);

    store.rollback();

    expect(store.get('a')).toBe(1);
    expect(store.get('b')).toBe(2);
  });
});
