import { bagOfTokensScore } from '../../src/two-pointer/bag-of-tokens';

describe('bag of tokens', () => {
  test('bag of tokens - test case 1', async () => {
    expect(bagOfTokensScore([100], 50)).toBe(0);
  });

  test('bag of tokens - test case 2', async () => {
    expect(bagOfTokensScore([200, 100], 150)).toBe(1);
  });

  test('bag of tokens - test case 3', async () => {
    expect(bagOfTokensScore([100, 200, 300, 400], 200)).toBe(2);
  });
});
