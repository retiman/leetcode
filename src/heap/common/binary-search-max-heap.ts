export interface Element<T> {
  value: T;
  priority: number;
}

// When there isn't time to implement a real heap in an interview, and the @datastructures-js/priority-queue library
// isn't available, you can use binary search insert in place of a real heap.  This will be O(1) for popping, but it
// will be O(n) for insert (even though the binary search is O(logn), we do have to resize the array at O(n)).
export class BinarySearchMaxHeap<T> {
  private readonly heap: Element<T>[];

  private readonly compare: (a: number, b: number) => number;

  constructor(compare?: (a: number, b: number) => number) {
    this.heap = [];
    this.compare = compare ?? ((a, b) => a - b);
  }

  public enqueue(value: T, priority?: number): BinarySearchMaxHeap<T> {
    const element: Element<T> = {
      value,
      priority: this.getPriority(value, priority)
    };

    let left = 0;
    let right = this.heap.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      const a = this.heap[mid];
      const b = element;
      // You can use < here for non-stable inserts, if you don't care.  Switch to <= for stable inserts.
      if (this.compare(a.priority, b.priority) < 0) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    this.heap.splice(left, 0, element);
    return this;
  }

  public dequeue(): T {
    if (this.isEmpty()) {
      throw new Error('heap is empty');
    }

    return this.heap.pop()!.value;
  }

  public front(): T {
    if (this.isEmpty()) {
      throw new Error('heap is empty');
    }

    return this.heap[this.heap.length - 1].value;
  }

  public size(): number {
    return this.heap.length;
  }

  public isEmpty(): boolean {
    return this.heap.length === 0;
  }

  private getPriority(value: T, priority?: number): number {
    if (priority !== undefined) {
      return priority;
    }

    if (typeof value === 'number') {
      return value;
    }

    return 0;
  }
}
