# DIFFICULTY: MEDIUM
# ------------------
#
# Given a list of tasks and their dependencies ['A:B,C', 'B:D,C,E', 'F:G'], return a list of parallelizable tasks in
# order.  For example, in this situation [(D, C, E, F), (B, G), (A)] would be a valid order because all parallelizable
# tasks are grouped together.
#
# See https://leetcode.com/discuss/interview-question/353830/google-phone-screen-parallel-job-scheduling
from collections import defaultdict, deque


class Solution:
    def parallelize(self, jobs: list[str]) -> list[list[str]]:
        """
        SOLUTION
        --------

        Use BFS with Kahn's algorithm to perform topological sort.  When processing nodes in parallel batches, reduce
        the in degree count each time we process.

        COMPLEXITY
        ----------

        Time complexity is O(v + e) to build the graph, find zero in degree nodes, and performing topological sort,
        where v is the number of tasks and e is the number of dependencies between them.

        Space complexity is O(v + e) as well.
        """
        graph: dict[str, set[str]] = defaultdict(set)
        in_degrees: dict[str, int] = defaultdict(int)
        nodes: set[str] = set()

        # Build the graph and compute in degrees.
        for job_spec in jobs:
            parts = job_spec.split(":")
            node = parts[0]
            children = parts[1].split(",") if len(parts) > 1 else []
            nodes.add(node)

            for child in children:
                graph[node].add(child)
                in_degrees[child] += 1
                nodes.add(child)

        # Initialize BFS queue with zero in degree nodes.
        queue: deque[str] = deque()
        for node in nodes:
            if in_degrees[node] == 0:
                queue.append(node)

        # Process nodes level by level in parallel execution batches.
        result: list[list[str]] = []
        while queue:
            size = len(queue)
            sub_result: list[str] = []

            for _ in range(size):
                node = queue.popleft()
                sub_result.append(node)

                # Reduce the in degree for each child.
                for child in graph[node]:
                    in_degrees[child] -= 1
                    if in_degrees[child] == 0:
                        queue.append(child)

            result.append(sub_result)

        return result
