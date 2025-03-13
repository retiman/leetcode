# DIFFICULTY: HARD
#
# Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
#
# The overall run time complexity should be O(log (m+n)).
#
# See https://leetcode.com/problems/median-of-two-sorted-arrays
import math


class Solution:
    def findMedianSortedArrays(self, xs: list[int], ys: list[int]) -> float:
        """
        SOLUTION
        --------

        This is not a reasonable question to ask in an interview.  It's quite algorithmically complex.

        The naive way to solve this problem is to simply merge the two arrays and then take the midpoint.  This is not
        what the problem asks for.

        To more efficiently find the median, imagine that the merged array's median partitions the merged array into two
        parts; a left part and a right part.  The left part's partition will have elements that are all less than the
        median, and the right part's partition will have elements that are all larger than the median.

        Our goal now is to find four partitions; two (possibly different sized) left partitions from each array such
        that the values in those partitions are all less than the median.  These two left partitions, if merged, would
        be the same as the left partition in the fully merged array.  Likewise, the two (possibly different sized) right
        partitions, when merged, would be the right partition of the merged array.

        Note that we know that the left partition in the merged array is going to have h = (m + n) / 2 elements, where m
        and n are the lengths of the two arrays (h representing half of the array elements in the merged array).  We
        need to take a guess at where to partition on the smaller array, so let's say that the size of that partition is
        s = m / 2.  Then the size of the left partition for the other array must be h - s.

        Using the values of s and h - s, we can check if we've hit upon properly sized partitions that give us the
        median.  If so, we can simply return it.  If we didn't hit upon the properly sized partitions, then we'll have
        to update our guess for s and try again.

        How do we try again?  Well, we can simulate concatenating the left partitions and right partitions to find out
        where we goofed for finding size s.  For the smaller array, if we found s by setting the left pointer to 0, and
        the right pointer to m / 2, then we'll have to use a modified version of binary search to update the pointers:

        - If the value at m = (left + right) / 2 was too small, set left = m + 1 and set right = m.
        - If the value at m = (left + right) / 2 was too big, set left = 0 and set right = m / 2.

        Continue updating the left and right pointers until we have found the median.

        COMPLEXITY
        ----------

        Time complexity is O(log (m + n)).

        Space complexity is O(1).
        """
        # Because we want to operate on the smaller array, let's find out which one is smaller and set xs equal to it.
        if len(xs) > len(ys):
            xs, ys = ys, xs

        # Again, we're using m and n as the array sizes, and m represents our smaller array size.
        m = len(xs)
        n = len(ys)

        # Note that this is a variation of the standard binary search algorithm.
        left = 0
        right = m
        while left <= right:
            # Compute the partition midpoints for both arrays.
            #
            # Imagine we have m = 3 and n = 3.  Then we want p1 to be at (m + n) / 2 = 1.  The size of the "merged"
            # array would be m + n = 6.  The midpoint of the other array, including the median, would be at
            # (m + n) / 2 - 3 = 3.
            #
            # However, for a "merged" array of odd size, say m = 3, and n = 4, then m + n = 7.  And if we use
            # (m + n) /2 - 3 = 3, that would not include the median at index 4.  So we should use (m + n + 1) / 2
            # instead.
            #
            # Using (m + n + 1) / 2 does not affect the calculation for an even sized "merged" array because the floor
            # function removes the decimal.
            p1 = (left + right) // 2  # Note that p1 needs to be calculated using left / right.
            p2 = ((m + n + 1) // 2) - p1  # Note that p2 needs to be calculated based on total size.

            # Now we imagine that the two left partitions are merged, and the two right partitions are merged.  If we've
            # chosen the partition points correctly, then the last value of both left partitions should be less than the
            # head values of both right partitons.
            #
            # Here's an example partition of two arrays, where p1 = 2 and p2 = 3.
            #
            # xs = [1,2   | 3,3]   with lmax1 = 2 and rmin1 = 3 (lmax1 is at p1 - 1 due to zero indexing).
            # ys = [1,2,3 | 4,5,5] with lmax2 = 3 and rmin2 = 4 (lmax2 is at p2 - 1 due to zero indexing).
            #
            # In this case, we want to compare the rightmost values of xs with the opposite leftmost value of ys, and
            # vice versa.
            #
            # Note that if p1 or p2 are zero, that means that the partitioning leaves no elements in the partition, so
            # those min/max values should be replaced by -Infinity or +Infinity.
            #
            # Consider the following cases:
            #
            # xs = []       with lmax1 = -Infinity because there is no value, and everything is > lmax1.
            # xs = [1,2,3|] with rmax1 = +Infinity because there is no value, and everything is < rmin1.
            lmax1 = -math.inf if p1 == 0 else xs[p1 - 1]  # If xs partition is empty, lmax1 value is unused.
            rmin1 = math.inf if p1 == m else xs[p1]  # If xs partition is full, rmin1 value is unused.
            lmax2 = -math.inf if p2 == 0 else ys[p2 - 1]  # If ys partition is empty, lmax2 value is unused.
            rmin2 = math.inf if p2 == n else ys[p2]  # If ys partition is full, rmin2 value is unused.

            # If our inequalities hold, we have found the median.  The value differs depending on if we have an odd
            # sized "merged" array or even.
            if lmax1 <= rmin2 and lmax2 <= rmin1:
                # Even case
                if (m + n) % 2 == 0:
                    return (max(lmax1, lmax2) + min(rmin1, rmin2)) / 2

                # Odd case.
                return max(lmax1, lmax2)

            # Here the xs side left partition's last value is too large, so we have to update the right pointer.  At the
            # next iteration we will do a binary search where the right pointer has been set to the element before p1.
            if lmax1 > rmin2:
                right = p1 - 1
            # Here the xs side left partition's last value is too small, so we have to change the left pointer.  At the
            # next iteration we will do binary search where the left pointer has been set to the element after p1.
            else:
                left = p1 + 1

        # This is never supposed to happen.
        raise Exception("arrays are not sorted")
