# DIFFICULTY: HARD
# ----------------
#
# There is an undirected graph consisting of n nodes numbered from 1 to n. You are given the integer n and a 2D array
# edges where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi. The graph can be disconnected.
#
# You can add at most two additional edges (possibly none) to this graph so that there are no repeated edges and no self-loops.
#
# Return true if it is possible to make the degree of each node in the graph even, otherwise return false.
#
# The degree of a node is the number of edges connected to it.
#
# See https://leetcode.com/problems/add-edges-to-make-degrees-of-all-nodes-even
from collections import defaultdict


class Solution:
    def isPossible(self, n: int, edges: list[list[int]]) -> bool:
        """
        SOLUTION
        --------

        When you add an edge between two nodes, you change the degree of those two nodes.  We don't need to modify edges
        for any even degree nodes; they are already good.  Instead we want to find nodes with an odd degree.

        If we join any two odd degree nodes with an edge, both of them will become even degree nodes.  Since we can only
        add at most two edges, this can only be possible if we have 0, 2, or 4 nodes with an odd degree.

        COMPLEXITY
        ----------

        Time complexity is O(m + n).  Each node and edge must be examined.

        Space complexity is O(m + n).  We are storing a set of edges and a map of each node to degree.
        """
        edgeSet: set[tuple[int, int]] = set()

        def normalizeEdge(edge: tuple[int, int]) -> tuple[int, int]:
            (a, b) = edge
            return (a, b) if a < b else (b, a)

        def hasEdge(edge: tuple[int, int]) -> bool:
            e = normalizeEdge(edge)
            return e in edgeSet

        def addEdge(edge: tuple[int, int]) -> None:
            e = normalizeEdge(edge)
            edgeSet.add(e)

        # Create a map of node -> degrees.
        degreeMap: dict[int, int] = defaultdict(int)
        for edge in edges:
            [a, b] = edge
            if a not in degreeMap:
                degreeMap[a] = 0
            if b not in degreeMap:
                degreeMap[b] = 0

            degreeMap[a] += 1
            degreeMap[b] += 1
            addEdge((a, b))

        # Find all odd degree nodes.  Note that nodes are number 1 through n inclusive.
        oddNodes: list[int] = []
        for i in range(1, n + 1):
            degrees = degreeMap[i]
            if degrees % 2 == 1:
                oddNodes.append(i)

        # Only 0, 2, or 4 odd degree node graphs can have edges added to create a valid all even degree path.  So if we
        # have 0 odd degree nodes, we are golden.
        if len(oddNodes) == 0:
            return True

        # If we have 2 odd degree nodes, we have to check if we can create an all even degree graph by doing one of the
        # following:
        #
        # 1. Add an edge between the two nodes, as long as it's not a duplicate.
        # 2. Add two edges connecting the nodes, with another node in between.
        if len(oddNodes) == 2:
            [a, b] = oddNodes
            # Check if we can create an all even degree graph by connecting the nodes directly.
            if not hasEdge((a, b)):
                return True

            # Check if we can create an all even degree graph by connecting the nodes through a different node.  Note
            # that the nodes are numbered 1 through n inclusive.
            for c in range(1, n + 1):
                if c == a or c == b:
                    continue

                if not hasEdge((a, c)) and not hasEdge((b, c)):
                    return True

            # Otherwise, it can't be done.
            return False

        # If we have 4 odd degree nodes, we can check if we can create an all even degree graph by connecting the nodes
        # together.  The nodes must be connected directly though; we can't connect them through some unrelated node as
        # that requires two edges already, leaving the other two odd degree nodes stranded.
        if len(oddNodes) == 4:
            [a, b, c, d] = oddNodes

            # With 4 nodes, we can only connect them in 3 distinct ways:
            pairs = [((a, b), (c, d)), ((a, c), (b, d)), ((a, d), (c, b))]
            for pair in pairs:
                (e1, e2) = pair
                if not hasEdge(e1) and not hasEdge(e2):
                    return True

            # Otherwise, it can't be done.
            return False

        # If we do NOT have 0, 2, or 4 odd degree nodes, there are no combination of 2 edges we can add to make this
        # possible.
        return False
