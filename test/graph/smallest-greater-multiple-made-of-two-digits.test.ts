import { findInteger } from '../../src/graph/smallest-greater-multiple-made-of-two-digits';

describe('smallest greater multiple made of two digits', () => {
  test('smallest greater multiple made of two digits - test case 1', async () => {
    expect(findInteger(2, 0, 2)).toBe(20);
  });

  test('smallest greater multiple made of two digits - test case 2', async () => {
    expect(findInteger(3, 4, 2)).toBe(24);
  });

  test('smallest greater multiple made of two digits - test case 1', async () => {
    expect(findInteger(2, 0, 0)).toBe(-1);
  });
});
