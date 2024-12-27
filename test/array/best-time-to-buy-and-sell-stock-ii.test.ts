import { maxProfit } from './../../src/array/best-time-to-buy-and-sell-stock-ii';

describe('best time to buy and sell stock ii', () => {
  test('max profit ii - test case 1', async () => {
    expect(maxProfit([7, 1, 5, 3, 6, 4])).toBe(7);
  });

  test('max profit ii - test case 2', async () => {
    expect(maxProfit([1, 2, 3, 4, 5])).toBe(4);
  });
});
