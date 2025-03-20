# DIFFICULTY: MEDIUM
# ------------------
#
# You are given an integer array prices where prices[i] is the price of a given stock on the ith day.
#
# On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any
# time. However, you can buy it then immediately sell it on the same day.
#
# Find and return the maximum profit you can achieve.
#
# See https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii
class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        """
        SOLUTION
        --------

        The question is a bit contrived, as in reality this would never happen.  Here, we are assuming we can go
        backwards in time to be able to buy at the low point and sell at the high point.  Just keep that in mind: we
        have a time machine.

        In the easy version of this problem, we can buy the stock and sell it at some later date, ONE TIME!  However,
        here, we can buy and sell as many times as we want.

        This actually makes the problem much easier because can simulate buying on every day and add to our profit if
        there is any.  Honestly, this should be easy and the other one should be medium.

        COMPLEXITY
        ----------

        Time complexity is O(n).

        Space complexity is O(1).
        """
        profit = 0

        # If we only have one day of price data, we can't make any profits at all.
        if len(prices) == 1:
            return profit

        for i in range(1, len(prices)):
            # Look at the difference in price between yesterday and today.
            previous = prices[i - 1]
            current = prices[i]
            delta = current - previous

            # If we end up having a profit by buying yesterday, let's sell it.
            if delta > 0:
                profit += delta

        return profit
