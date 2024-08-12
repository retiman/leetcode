// DIFFICULTY: Medium
//
// You are given an integer array prices where prices[i] is the price of a given stock on the ith day.
//
// On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any
// time. However, you can buy it then immediately sell it on the same day.
//
// Find and return the maximum profit you can achieve.
//
// See https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii
describe('best time to buy and sell stock ii', () => {
  // The question is a bit contrived, as in reality this would never happen.  Here, we are assuming we can go backwards
  // in time to be able to buy at the low point and sell at the high point.  Just keep that in mind: we have a time
  // machine.
  //
  // In the easy version of this problem, we can buy the stock and sell it at some later date, ONE TIME!  However, here,
  // we can buy and sell as many times as we want.
  //
  // This actually makes the problem much easier because can simulate buying on every day and add to our profit if there
  // is any.  Honestly, this should be easy and the other one should be medium.
  function maxProfit(prices: number[]): number {
    let profit = 0;

    // If we only have one day of price data, we can't make any profits at all.
    if (prices.length === 1) {
      return profit;
    }

    for (let i = 1; i < prices.length; i++) {
      // Look at the difference in price between yesterday and today.
      const previous = prices[i - 1];
      const current = prices[i];
      const delta = current - previous;

      // If we end up having a profit by buying yesterday, let's sell it.
      if (delta > 0) {
        profit += delta;
      }
    }

    return profit;
  }

  test('max profit ii - test case 1', async () => {
    expect(maxProfit([7, 1, 5, 3, 6, 4])).toBe(7);
  });

  test('max profit ii - test case 2', async () => {
    expect(maxProfit([1, 2, 3, 4, 5])).toBe(4);
  });
});
