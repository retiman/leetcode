import { myPow } from '../../src/math/pow-x-n';

describe('pow', () => {
  test('pow - test case 1', async () => {
    expect(myPow(2, -2)).toBe(0.25);
  });

  test('pow - test case 2', async () => {
    expect(myPow(2, -1)).toBe(0.5);
  });

  test('pow - test case 3', async () => {
    expect(myPow(2, 0)).toBe(1);
  });

  test('pow - test case 4', async () => {
    expect(myPow(2, 1)).toBe(2);
  });

  test('pow - test case 5', async () => {
    expect(myPow(2, 4)).toBe(16);
  });

  test('pow - test case 6', async () => {
    expect(myPow(2, 5)).toBe(32);
  });

  test('pow - test case 7', async () => {
    expect(myPow(2, -2147483648)).toBe(0);
  });
});
