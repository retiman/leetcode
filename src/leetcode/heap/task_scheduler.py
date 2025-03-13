# DIFFICULTY: MEDIUM
#
# You are given an array of CPU tasks, each represented by letters A to Z, and a cooling time, n. Each cycle or
# interval allows the completion of one task. Tasks can be completed in any order, but there's a constraint: identical
# tasks must be separated by at least n intervals due to cooling time.
#
# ​Return the minimum number of intervals required to complete all tasks.
#
# See https://leetcode.com/problems/task-scheduler
from collections import defaultdict, deque
from heapq import heappop, heappush


class Solution:
    def leastInterval(self, tasks: list[str], n: int) -> int:
        """
        SOLUTION
        --------

        It's not necessary to return an execution order, only the minimum number of cycles/intervals required to
        complete all of the tasks.

        Note that either the most frequent task or the number of tasks will dictate the number of cycles required.
        First let's examine the case where we have a very frequent task that requires multiple cooling off periods.

        Let's suppose that task A appears 10 times, and task B appears 9 times, and some other tasks appear with lower
        frequency.  No matter what, the 10 executions of task A will require n cycles of gaps between them, except for
        the last execution of task A.  This means that there will be n cycles of idle slots between the executions of
        task A.  But because we have 9 executions that need to spaced out (not the last), there are (10 - 1) * n empty
        cycles between A, for the other tasks to execute.

        Here, even though task B appears 9 times, we can fit task B comfortably in between the 9 cycles of task A.
        This, however, doesn't quite work if there are a huge number of tasks; if there are 10 task A's and 9 task B's,
        but 50 other uniquely named tasks, then we will still take 50 cycles if (10 - 1) * n is a smaller number.

        COMPLEXITY
        ----------

        Time complexity is O(m + n) where m is the total number of tasks.  While we do perform O(k log k) operations to
        build the heap, k is always at most 26 characters, so that is still effectively constant time.  Likewise, any
        log k operations are effectively constant time as well.

        Space complexity is O(n).
        """
        # Create a map of task to frequency.
        map: dict[str, int] = defaultdict(int)
        for task in tasks:
            map[task] += 1

        # Create a max heap of frequency.  To simulate max heap, negate the value.
        max_heap: list[int] = []
        for freq in map.values():
            heappush(max_heap, -freq)

        # Create a queue of [freq, cycle] for cooldown tasks.
        queue: deque[tuple[int, int]] = deque()
        cycle = 0

        # Process tasks.
        while max_heap or queue:
            if queue:
                (f, c) = queue[0]
                if c == cycle:
                    queue.popleft()
                    # Negate frequency because it's a max heap.
                    heappush(max_heap, -f)

            if max_heap:
                # Negate frequency because it's a max heap.
                f = -heappop(max_heap)
                f -= 1

                if f != 0:
                    queue.append((f, cycle + n + 1))

            cycle += 1

        return cycle
