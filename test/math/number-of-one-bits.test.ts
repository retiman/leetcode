import { hammingWeight } from '../../src/math/number-of-one-bits';

describe('number of one bits', () => {
  test('number of one bits - test case 1', async () => {
    // Because 11 = 0b1001
    expect(hammingWeight(11)).toBe(3);
  });
});
