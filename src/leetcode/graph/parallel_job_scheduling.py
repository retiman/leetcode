# DIFFICULTY: MEDIUM
#
# Given a list tasks and their dependencies ['A:B,C', 'B:D,C,E', 'F:G'], return a list of parallelizable tasks in
# order.  For example, in this situation [(D, C, E, F), (B, G), (A)] would be a valid order because all parallelizable
# tasks are grouped together.
#
# NOTE: This is not a LeetCode question but was asked by Cruise.
#
# See https://leetcode.com/discuss/interview-question/353830/google-phone-screen-parallel-job-scheduling
from collections import defaultdict, deque

class Solution:
    def parallelize(self, jobs: list[str]) -> list[list[str]]:
        """
        SOLUTION
        --------

        Use BFS with Kahn's algorithm to perform topological sort.
        """
        graph = defaultdict(set)
        in_degree = defaultdict(int)