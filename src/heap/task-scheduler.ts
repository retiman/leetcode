// DIFFICULTY: Medium
//
// You are given an array of CPU tasks, each represented by letters A to Z, and a cooling time, n. Each cycle or
// interval allows the completion of one task. Tasks can be completed in any order, but there's a constraint: identical
// tasks must be separated by at least n intervals due to cooling time.
//
// ​Return the minimum number of intervals required to complete all tasks.
//
// See https://leetcode.com/problems/task-scheduler/
import { MaxPriorityQueue } from '@datastructures-js/priority-queue';
export { leastInterval };

// SOLUTION:
//
// It's not necessary to return an execution order, only the minimum number of cycles/intervals required to complete
// all of the tasks.
//
// Note that either the most frequent task or the number of tasks will dictate the number of cycles required.  First
// let's examine the case where we have a very frequent task that requires multiple cooling off periods.
//
// Let's suppose that task A appears 10 times, and task B appears 9 times, and some other tasks appear with lower
// frequency.  No matter what, the 10 executions of task A will require n cycles of gaps between them, except for the
// last execution of task A.  This means that there will be n cycles of idle slots between the executions of
// task A.  But because we have 9 executions that need to spaced out (not the last), there are (10 - 1) * n empty
// cycles between A, for the other tasks to execute.
//
// Here, even though task B appears 9 times, we can fit task B comfortably in between the 9 cycles of task A.  This,
// however, doesn't quite work if there are a huge number of tasks; if there are 10 task A's and 9 task B's, but 50
// other uniquely named tasks, then we will still take 50 cycles if (10 - 1) * n is a smaller number.
function leastInterval(tasks: string[], n: number): number {
  type Task = string;
  type Frequency = number;
  const map = new Map<Task, Frequency>();
  for (const task of tasks) {
    const freq = map.get(task) ?? 0;
    map.set(task, freq + 1);
  }

  const heap = new MaxPriorityQueue<number>();
  for (const [_, freq] of map) {
    heap.enqueue(freq);
  }

  type Item = {
    freq: number;
    cycle: number;
  };
  let cycle = 0;
  const queue: Item[] = [];
  while (!heap.isEmpty() || queue.length !== 0) {
    if (queue.length !== 0) {
      if (queue[0].cycle === cycle) {
        const item = queue.shift()!;
        heap.enqueue(item.freq);
      }
    }

    if (!heap.isEmpty()) {
      let freq = heap.dequeue();
      freq--;

      if (freq !== 0) {
        queue.push({
          freq,
          cycle: cycle + n + 1
        });
      }
    }

    cycle++;
  }

  return cycle;
}
