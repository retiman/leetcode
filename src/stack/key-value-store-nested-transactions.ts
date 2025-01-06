// DIFFICULTY: MEDIUM
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
// See {@link https://leetcode.com/discuss/interview-question/279913/Bloomberg-or-Onsite-or-Key-Value-Store-with-transactions}
export { KeyValueStore };

// SOLUTION:
//
// The key to this problem is to maintain a stack of maps.  When you start a transaction, you push a new map onto the
// stack.
//
// To improve runtime performance, we maintain a current transaction context that gets propagated to the top of the
// stack (or thrown away if we rollback).
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
