# DIFFICULTY: MEDIUM
# ------------------
#
# You are given a 0-indexed array of positive integers w where w[i] describes the weight of the ith index.
#
# You need to implement the function pickIndex(), which randomly picks an index in the range [0, w.length - 1]
# (inclusive) and returns it. The probability of picking an index i is w[i] / sum(w).
#
# For example, if w = [1, 3], the probability of picking index 0 is 1 / (1 + 3) = 0.25 (i.e., 25%), and the
# probability of picking index 1 is 3 / (1 + 3) = 0.75 (i.e., 75%).
#
# See https://leetcode.com/problems/random-pick-with-weight
import random


class Solution:
    """
    SOLUTION
    --------

    The naive way to do this is to take the weights and create a new array that's the size of the sum of the
    weights.  For example, if you have the input [1, 3], create an array [0, 1, 1, 1].  Then, generate a random
    number using floor(random() * 4) to get a number between 0 and 3 inclusive.  That's the index you should pick.

    This will work, but once you have a large number of weights, you'll be creating quite large arrays.  Probably
    not a good idea.

    Instead, we can compute a prefix sum to avoid expanding an array.  In the previous example, you can turn the
    input array [1, 3] into the prefix sum array [1, 4].  The cumulative weights divide the range in this way:

    [0, 1) -> Index 0
    [1, 4) -> Index 1

    So if you generate a random number between [0, 4), you can do a linear scan of the prefix sum array to find the
    index that you should pick.  This works because each range's weight increases as you move to the right.

    Likewise, if you had the input array [1, 4, 2], the prefix sum array would be [1, 5, 7].  The ranges would be:

    [0, 1) -> Index 0
    [1, 5) -> Index 1
    [5, 7) -> Index 2

    And again, picking a random number between [0, 7) would allow you to do a linear scan to find the index to pick.

    But wait!  Instead of doing a linear scan, it's much more efficient to do a binary search, which is what this
    solution does.

    COMPLEXITY
    ----------

    Time complexity in O(n).  It is O(n) to create the prefix sum array, then O(n) to perform a linear scan, or
    O(log n) to perform a binary search.

    Space complexity is O(n) because we are storing the prefix sum array.
    """

    def __init__(self, w: list[int]) -> None:
        self.prefix_sum = [0] * len(w)
        self.total = 0
        for i, weight in enumerate(w):
            self.total += weight
            self.prefix_sum[i] = self.total

    def pickIndex(self) -> int:
        # Pick a random number between [0, total).  Doesn't have to be an integer at all; it's just a number between 0
        # and the total.
        target = random.randint(0, self.total - 1)

        # Use insertion point binary search instead of exact match.  We aren't looking for an exact match of the element
        # in the array.  In fact, it's unlikely to even be in the array.  Instead we'll use insertion point binary
        # search which is more conceptually appropriate.
        left = 0
        right = len(self.prefix_sum)

        while left < right:
            mid = (left + right) // 2
            if self.prefix_sum[mid] <= target:
                left = mid + 1
            else:
                right = mid

        # The "insertion point" is the index that corresponds to the random number.
        return left
