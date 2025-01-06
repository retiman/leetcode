import { maxProfit } from '../../src/sliding-window/best-time-to-buy-and-sell-stock-i';

describe('best time to buy and sell stock i', () => {
  test('max profit i - test case 1', async () => {
    expect(maxProfit([7, 1, 5, 3, 6, 4])).toBe(5);
  });

  test('max profit i - test case 2', async () => {
    expect(maxProfit([7, 6, 4, 3, 1])).toBe(0);
  });
});
