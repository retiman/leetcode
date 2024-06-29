// DIFFICULTY: Medium
//
// You are given an integer array heights representing the heights of buildings, some bricks, and some ladders.
//
// You start your journey from building 0 and move to the next building by possibly using bricks or ladders.
//
// While moving from building i to building i+1 (0-indexed),
//
// - If the current building's height is greater than or equal to the next building's height, you do not need a ladder
//   or bricks.
// - If the current building's height is less than the next building's height, you can either use one ladder or
//   (h[i+1] - h[i]) bricks.
//
// Return the furthest building index (0-indexed) you can reach if you use the given ladders and bricks optimally.
describe('furthest building you can reach', () => {
  // This cannot be solved with the sliding window technique; usually that technique involves finding a fixed size
  // sub-string sub-array with constraints.  Here we need to dynamically adjust our resource (brick/ladder) usage at
  // each step, making a greedy algorithm better to solve the problem.
  function furthestBuilding(heights: number[], bricks: number, ladders: number): number {
    // Use a heap/priority queue to store the number of jumps we need to make with either bricks or ladders.
    const heap = new MinHeap();

    for (let i = 0; i < heights.length - 1; i++) {
      const delta = heights[i + 1] - heights[i];

      // If the height is same level or lower, we can jump across with no penalty.
      if (delta <= 0) {
        continue;
      }

      // If the height is higher by some amount, push it onto the heap and make a determination on whether we use a
      // ladder or some bricks to scale the difference.
      //
      // We should use ladders on the biggest deltas, so if we greedily consume the smallest deltas from the heap, as
      // long as we have enough ladders to cover the remaining length of the heap, we can continue.
      heap.push(delta);

      // As mentioned, the heap stores how many jumps that consume ladders or bricks at this point.  Because ladders
      // can represent any number of bricks, this means that we "buy" elements in the heap, or that the heap may have
      // an ambient size.
      //
      // For example, normally each element pushed onto the heap must be popped off.  However, if we have 3 ladders,
      // the min heap is permitted to contain 3 elements that don't need to be popped off.  These 3 elements are the
      // biggest deltas, and we use ladders to traverse them.
      //
      // At this moment, we don't know which 3 elements will be the biggest, but we just treat 3 as the "floor" size of
      // the heap and continue if we haven't met this floor.
      if (ladders >= heap.size()) {
        // Assume that this delta, at height i, will be claimed by a ladder.
        continue;
      }

      // If, at this point, we've run out of ladders, we'll need to pop off the smallest element and use bricks to cross
      // the delta.  This will cause the largest element to be different, but the ladder doesn't care how big the
      // largest element is.
      const smallest = heap.pop()!;
      bricks -= smallest;

      // If we've run out of bricks, it's okay.  But if we've gone negative into bricks, we can't cross this gap and
      // we return i (since we can't get to i + 1).
      if (bricks < 0) {
        return i;
      }
    }

    // There's no building at heights.length; the last building is at heights.length - 1.
    return heights.length - 1;
  }

  // TypeScript doesn't have a priority queue implementation; a naive implementation can just be backed by an array and
  // be sorted on insert.  However!  This causes LeetCode time limits to be exceeded.  We'll need a real implmentation
  // here instead.
  class Node {
    value: number;
    left: Node | null = null;
    right: Node | null = null;
    parent: Node | null = null;

    constructor(value: number) {
      this.value = value;
    }
  }

  class MinHeap {
    private root: Node | null = null;

    private length: number = 0;

    push(value: number): void {
      const newNode = new Node(value);
      if (this.root === null) {
        this.root = newNode;
      } else {
        this.insertNode(this.root, newNode);
      }
      this.length++;
      this.heapifyUp(newNode);
    }

    private insertNode(root: Node, newNode: Node): void {
      const queue: (Node | null)[] = [root];
      while (queue.length > 0) {
        const node = queue.shift()!;
        if (node.left === null) {
          node.left = newNode;
          newNode.parent = node;
          return;
        }
        if (node.right === null) {
          node.right = newNode;
          newNode.parent = node;
          return;
        }
        queue.push(node.left);
        queue.push(node.right);
      }
    }

    private heapifyUp(node: Node): void {
      while (node.parent !== null && node.parent.value > node.value) {
        [node.value, node.parent.value] = [node.parent.value, node.value];
        node = node.parent;
      }
    }

    pop(): number | undefined {
      if (this.root === null) {
        return undefined;
      }
      const min = this.root.value;
      const lastNode = this.getLastNode();
      if (lastNode === this.root) {
        this.root = null;
      } else {
        this.root.value = lastNode!.value;
        this.removeLastNode();
        this.heapifyDown(this.root);
      }
      this.length--;
      return min;
    }

    private getLastNode(): Node | null {
      const queue: (Node | null)[] = [this.root];
      let lastNode: Node | null = null;
      while (queue.length > 0) {
        lastNode = queue.shift()!;
        if (lastNode!.left !== null) queue.push(lastNode!.left);
        if (lastNode!.right !== null) queue.push(lastNode!.right);
      }
      return lastNode;
    }

    private removeLastNode(): void {
      const queue: (Node | null)[] = [this.root];
      let lastNodeParent: Node | null = null;
      let lastNode: Node | null = null;
      while (queue.length > 0) {
        lastNodeParent = queue.shift()!;
        if (lastNodeParent!.left !== null) {
          queue.push(lastNodeParent!.left);
          lastNode = lastNodeParent!.left;
        }
        if (lastNodeParent!.right !== null) {
          queue.push(lastNodeParent!.right);
          lastNode = lastNodeParent!.right;
        }
      }
      if (lastNodeParent!.right === lastNode) {
        lastNodeParent!.right = null;
      } else {
        lastNodeParent!.left = null;
      }
    }

    private heapifyDown(node: Node): void {
      while (node.left !== null) {
        let smallestChild = node.left;
        if (node.right !== null && node.right.value < node.left.value) {
          smallestChild = node.right;
        }
        if (node.value < smallestChild.value) {
          break;
        }
        [node.value, smallestChild.value] = [smallestChild.value, node.value];
        node = smallestChild;
      }
    }

    peek(): number | undefined {
      return this.root?.value;
    }

    size(): number {
      return this.length;
    }
  }

  test('test case 1', async () => {
    const heights = [4, 2, 7, 6, 9, 14, 12];
    expect(furthestBuilding(heights, 5, 1)).toBe(4);
  });

  test('test case 2', async () => {
    const heights = [4, 12, 2, 7, 3, 18, 20, 3, 19];
    expect(furthestBuilding(heights, 10, 2)).toBe(7);
  });

  test('test case 3', async () => {
    const heights = [14, 3, 19, 3];
    expect(furthestBuilding(heights, 17, 0)).toBe(3);
  });
});
