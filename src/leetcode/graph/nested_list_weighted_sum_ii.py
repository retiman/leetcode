# DIFFICULTY: MEDIUM
#
# You are given a nested list of integers nestedList. Each element is either an integer or a list whose elements may
# also be integers or other lists.
#
# The depth of an integer is the number of lists that it is inside of. For example, the nested list [1,[2,2],[[3],2],1]
# has each integer's value set to its depth. Let maxDepth be the maximum depth of any integer.
#
# The weight of an integer is maxDepth - (the depth of the integer) + 1.
#
# Return the sum of each integer in nestedList multiplied by its weight.
#
# See https://leetcode.com/problems/nested-list-weight-sum-ii
from collections import defaultdict
from leetcode.graph.common.nested_integer import NestedInteger


class Solution:
    def depthSumInverse(self, nestedList: list[NestedInteger]) -> int:
        """
        SOLUTION
        --------

        Unlike the previous problem where we just multiply the integer by its depth, we need to multiply by the weight
        of the integer.  Since we won't know the weight until after we've traversed the entire list, we'll need to keep
        track of depth to integers, then calculate the weight and sum up at the end.

        However, like before, this is still going to be a DFS search, except we don't need to keep track of visited
        nodes.

        COMPLEXITY
        ----------

        Time complexity is O(n) where n is the number of total integers and lists in the data structure.

        Space complexity is O(d) where d is the depth of the nested list.
        """
        # Define a list of depth -> integers; each integer at that depth will have the same weight.  We'll compute the
        # max depth as we traverse.
        map: dict[int, list[int]] = defaultdict(list[int])
        max_depth = 0

        def compute(x: NestedInteger, depth: int) -> None:
            nonlocal max_depth
            max_depth = max(depth, max_depth)

            if x.isInteger():
                value = x.getInteger() or 0
                map[depth].append(value)
            else:
                values = x.getList()
                for value in values:
                    compute(value, depth + 1)

        for nested in nestedList:
            compute(nested, 0)

        # Now that we have the map, just multiply each list of integers at each depth by the computed weight, and sum.
        result = 0
        for depth, values in map.items():
            weight = max_depth - depth + 1
            partial = sum(values) * weight
            result += partial

        return result
