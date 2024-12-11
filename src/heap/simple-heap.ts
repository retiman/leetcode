export interface Element<T> {
  value: T;
  priority: number;
}

// When there isn't time to implement a real heap in an interview, and the @datastructures-js/priority-queue library
// isn't available, just insert and sort.  This will be O(nlogn) on insert but it's quick and dirty.
export class SimpleMaxHeap<T> {
  private readonly heap: Element<T>[];

  private readonly compare: (a: number, b: number) => number;

  constructor(compare?: (a: number, b: number) => number) {
    this.heap = [];
    this.compare = compare ?? ((a, b) => a - b);
  }

  public enqueue(value: T, priority?: number): void {
    const element: Element<T> = {
      value,
      priority: this.getPriority(value, priority)
    };
    this.heap.push(element);
    this.heap.sort((a, b) => this.compare(a.priority, b.priority));
  }

  public dequeue(): Element<T> {
    if (this.isEmpty()) {
      throw new Error('heap is empty');
    }

    return this.heap.pop()!;
  }

  public front(): Element<T> {
    if (this.isEmpty()) {
      throw new Error('heap is empty');
    }

    return this.heap[this.heap.length - 1];
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
