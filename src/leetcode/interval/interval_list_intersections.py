# DIFFICULTY: MEDIUM
#
# You are given two lists of closed intervals, firstList and secondList, where firstList[i] = [starti, endi] and
# secondList[j] = [startj, endj]. Each list of intervals is pairwise disjoint and in sorted order.
#
# Return the intersection of these two interval lists.
#
# A closed interval [a, b] (with a <= b) denotes the set of real numbers x with a <= x <= b.
#
# The intersection of two closed intervals is a set of real numbers that are either empty or represented as a closed
# interval. For example, the intersection of [1, 3] and [2, 4] is [2, 3].
#
# See https://leetcode.com/problems/interval-list-intersections
class Solution:
    def intervalIntersection(self, firstList: list[list[int]], secondList: list[list[int]]) -> list[list[int]]:
        """
        SOLUTION
        --------

        This is a very straightforward problem except there's a very strange wrinkle in that intersections can be empty
        intervals.  Because of this we can't just advance both pointers when we find an intersection.  Instead, we have
        to only advance the one with the smaller endpoint.

        COMPLEXITY
        ----------

        Time complexity is O(m + n) since it iterates through both lists once each.

        Space complexity is O(min(m, n)) since the intersections array is limited by the size of the smaller list.
        """

        def isIntersecting(a: list[int], b: list[int]) -> bool:
            """
            The two intervals will intersect if we have a situation like this:

            A: [.......]
            B:   [.......]

            ...where B[x] is greater than A[x] and B[x] is less than A[y].  Also, we can get an intersection like this:

            A:   [.......]
            B: [.......]

            ...where A[x] is greater than B[x] and A[x] is less than B[y].
            """
            [ax, ay] = a
            [bx, by] = b
            return (ax <= bx <= ay) or (bx <= ax <= by)

        # Now we can iterate through both and check if they intersect.  If no intersection exists, then we must have a
        # a situation like one of these:
        #
        # A: [..]
        # B:      [.....]
        #
        # ...or...
        #
        # A:      [.....]
        # B: [..]
        #
        # In these cases, whichever of A[y] or B[y] is SMALLER is the one that should be dropped and advanced.  That's
        # because the intervals are disjoint, so the smaller of the y values will be the one that is further to the
        # left, and not able to intersect with anything.
        #
        # We can stop as soon as one list is exhausted because there can't be any more intersections after that.
        intersections: list[list[int]] = []
        i = 0
        j = 0
        while i < len(firstList) and j < len(secondList):
            a = firstList[i]
            b = firstList[j]
            ax, ay = a[0], a[1]
            bx, by = b[0], b[1]

            if isIntersecting(a, b):
                # Calculate the intersection.
                #
                # A: [...|....]
                # B:     [....|...]
                #
                # We'll want the max of the two start points and the min of the two end points.
                #
                # It could also be the case that we have something like this:
                #
                # A: [....|
                # B:      |....]
                #
                # In which case the intersection is an empty interval.  This is weird.  But it will become relevant in
                # the next step.  We shouldn't just advance BOTH pointers because of this empty interval situation.
                # Instead, we should just advance the smaller of the two end points.
                c = [max(ax, bx), min(ay, by)]
                intersections.append(c)

            # Advance the one that has the smaller end point.
            if ay < by:
                i += 1
            else:
                j += 1

        return intersections
