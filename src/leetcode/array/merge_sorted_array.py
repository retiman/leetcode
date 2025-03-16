# DIFFICULTY: EASY
# ----------------
#
# You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n,
# representing the number of elements in nums1 and nums2 respectively.
#
# Merge nums1 and nums2 into a single array sorted in non-decreasing order.
#
# The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To
# accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged,
# and the last n elements are set to 0 and should be ignored. nums2 has a length of n.
#
# See https://leetcode.com/problems/merge-sorted-array
class Solution:
    def merge(self, xs: list[int], m: int, ys: list[int], n: int) -> None:
        """
        SOLUTION
        --------

        TLDR: Work backwards.  Send the largest elements from the smaller array to the end of the bigger array.

        This would be VERY easy, if you could use extra memory.  To merge without using extra memory, we do need to
        merge into the bigger array, xs.

        You could go about this in two different ways:

        1. Start from the logical beginning of both arrays and swap elements as needed to maintain the correct order.
        2. Start from the logical end of both arrays and add largest elements to the end of xs.

        Going with option 1 is more natural, but it's more error prone and more work.  There may be elements at the end
        of xs that need to be shifted to the right to make room.

        Going with option 2 is less natural, but it ensures you have enough space.  Since nums1 has size m + n, and ys
        has size n, you can reliably fit all of nums2 into nums1 without any collisions or shifting.  Additionally, if
        you use up all the elements in ys, you don't need to do anything with the remaining elements of ys since they
        are already sorted.

        Pro tip: when asked to do something in place, and you have extra space, consider doing backwards iteration
        instead of forwards to avoid collisions and overwriting elements.  Secondly, if you started with forwards
        iteration and realize you might have to shift elements, consider a backwards iteration approach to see if it
        might work better.

        The problem doesn't state this, but we assume using no extra memory either.

        COMPLEXITY
        ----------

        Time complexity is O(m + n).

        Space complexity is O(1) as per problem requirements.
        """
        i = m - 1
        j = n - 1
        last = m + n - 1

        # Send the largest elements from both arrays to the end of the array xs.
        while i >= 0 and j >= 0:
            a = xs[i]
            b = ys[j]

            if a < b:
                xs[last] = ys[j]
                j -= 1
                last -= 1
            else:
                xs[last] = xs[i]
                i -= 1
                last -= 1

        # Now we have consumed all elements in one of the arrays.  If there are remaining elements in ys, we should add
        # them to the array xs.
        #
        # On the other hand, if there are remaining elements in xs, there's nothing to be done because that slice of the
        # array is already sorted.
        while j >= 0:
            xs[last] = ys[j]
            j -= 1
            last -= 1
