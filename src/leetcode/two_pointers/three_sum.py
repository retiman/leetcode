# DIFFICULTY: MEDIUM
# ------------------
#
# Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that
# i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
#
# Notice that the solution set must not contain duplicate triplets.
#
# See https://leetcode.com/problems/3sum
class Solution:
    def threeSum(self, xs: list[int]) -> list[list[int]]:
        """
        SOLUTION
        --------

        The two sum problem can be solved with a two pointer approach.  This can be solved with a similar approach, but
        you'll need to apply the two pointer approach to every element in the array.

        COMPLEXITY
        ----------

        Time complexity is O(n^2) where n is the number of elements in the array.

        Space complexity is O(1).
        """
        result: list[list[int]] = []

        # Sorting will help us more efficiently use the sliding window approach to find the triplets that sum to 0.
        #
        # Note that xs.sort() will sort by string value.  So if you have negative numbers, something like [-1, -2, 0] is
        # considered "sorted".  To fix this, make sure to explicitly provide a compare function.
        xs.sort()

        # For each of the elements we will use a sliding window approach to find the other two elements that will sum up
        # to 0.
        #
        # There are two ways we can think of this: we can think of our current element as element b, then set the left
        # point to 0 and the right pointer to the length of the array - 1.  However, if we do this, we will reconsider
        # elements we've already seen as the pointer advances.
        #
        # Instead, we'll consider the current element as a, then b starts at left = i + 1, and c starts at
        # right = length - 1.
        for i in range(len(xs) - 2):
            # Because we can't have duplicate triples in the result, we should just skip over any duplicates.
            if i > 0 and xs[i] == xs[i - 1]:
                continue

            # For each element a, use the two pointers technique to find (b, c) such that a + b + c = 0.
            a = xs[i]

            # We cannot have duplicate triples in the result.  We can do this by setting the left pointer to 0, and the
            # right pointer to the last element, tightening the bounds as we consider sums.  However, this will
            # reconsider duplicate triples as i advances.  We would need a set to dedupe the triples.
            #
            # Starting the left pointer at i + 1 avoids this problem.
            left = i + 1
            right = len(xs) - 1
            while left < right:
                b = xs[left]
                c = xs[right]
                total = a + b + c

                # If the sum is less than 0, that means we need to increase the sum, so advance the left pointer.
                if total < 0:
                    left += 1
                    continue

                # If the sum is greater than 0, that means we need to decrease the sum, so advance the right pointer.
                if total > 0:
                    right -= 1
                    continue

                # If the sum is the target of 0, add the triple to the result array.  However, there may yet still be
                # more triplets we haven't found with our pointers!
                #
                # To find them, we should keep advancing the pointers past any dupes (as long as they are in range).
                if total == 0:
                    result.append([a, b, c])

                    # Advance the left pointer to skip any dupes of b.
                    while left < right and xs[left + 1] == xs[left]:
                        left += 1

                    # Advance the right pointer to skip any dupes of c.
                    while left < right and xs[right - 1] == xs[right]:
                        right -= 1

                    # Advance both pointers to consider the next potential sum.  We need to advance here and not before
                    # doing the while loops because advancing could have put us into a dupe!
                    left += 1
                    right -= 1

        return result
