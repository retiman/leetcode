// DIFFICULTY: Easy
//
// You are given an array prices where prices[i] is the price of a given stock on the ith day.
//
// You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future
// to sell that stock.
//
// Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.
//
// See https://leetcode.com/problems/best-time-to-buy-and-sell-stock
describe('best time to buy and sell stock i', () => {
  // The question is a bit contrived, as in reality this would never happen.  Here, we are assuming we can go backwards
  // in time to be able to buy at the low point and sell at the high point.  Just keep that in mind: we have a time
  // machine.
  //
  // This type of problem is easily solved with a modified version of the sliding window technique.  We will maintain
  // a minimum price and update that value whenever we see a lower value, from there we can calculate proposed profit
  // on any given day.
  //
  // By iterating through the array we'll find the maximum profit at the end.
  function maxProfit(prices: number[]): number {
    // We want to buy at the lowest point, and then sell at the highest point.  To do this, keep track of the minimum
    // stock price at any point, and use that minimum stock price to determine our maximum profit.
    let minimum = Infinity;
    let profit = 0;

    for (let i = 0; i < prices.length; i++) {
      const price = prices[i];

      // If the price ends up being lower than what we've ever seen, buy it and see if we can profit.
      if (price < minimum) {
        minimum = price;
        continue;
      }

      // Unfortunately, it can be the case that we bought at a low point but the stock continues or fall or trades flat.
      // If that is the case, we'll keep our previous value of max profit.
      const current = price - minimum;
      profit = Math.max(profit, current);
    }

    return profit;
  }

  test('max profit i - test case 1', async () => {
    expect(maxProfit([7, 1, 5, 3, 6, 4])).toBe(5);
  });

  test('max profit i - test case 2', async () => {
    expect(maxProfit([7, 6, 4, 3, 1])).toBe(0);
  });
});
