// DIFFICULTY: Medium
//
// Implement pow(x, n), which calculates x raised to the power n (i.e., xn).
//
// See https://leetcode.com/problems/powx-n/
describe('pow', () => {
  function __naiveMyPow(x: number, n: number): number {
    if (n < 0) {
      return __naiveMyPow(1 / x, -n);
    }

    if (n === 0) {
      return 1;
    }

    let e = n;
    let result = 1;
    while (e > 0) {
      result *= x;
      e -= 1;
    }

    return result;
  }

  // This is based on the fact that:
  //
  // x^n = (x^2)^(n/2)     if x n is even
  // x^n = x * (x^(n-1)/2) if n is odd
  //
  // Exponentiation by squaring is faster because the naive method requires n multiplications, but squaring each
  // time only requires log(n) multiplications.
  function __fasterMyPow(x: number, n: number): number {
    if (n < 0) {
      return __fasterMyPow(1 / x, -n);
    }

    if (n === 0) {
      return 1;
    }

    if (n % 2 === 0) {
      return __fasterMyPow(x * x, n / 2);
    }

    return x * __fasterMyPow(x * x, (n - 1) / 2);
  }

  // We can replace some of the operations with bit shift operations to make things faster, and we can also remove the
  // recursion.
  //
  // Otherwise we still use the fact that:
  //
  // x^n = (x^2)^(n/2)     if x n is even
  // x^n = x * (x^(n-1)/2) if n is odd
  function myPow(x: number, n: number) {
    if (n === 0) {
      return 1;
    }

    let xi = x;
    let ni = n;
    if (ni < 0) {
      xi = 1 / x;
      ni = -n;
    }

    let result = 1;
    while (ni > 0) {
      // Rather than use ni % 2 to check if a number is even, use bitwise and.  If the result is 1, then the least
      // significant bit is a 1.  Otherwise, the bit is 0.
      const isEven = (ni & 1) === 0;
      if (isEven) {
        xi *= xi;
        // Rather than divide by 2, we can use the right bit shift operator to do a faster division.  The `>>>`
        // operation is an unsigned bit shift to the right.  This means the leftmost bits are filled with 0's regardless
        // of the sign of the original number.
        ni >>>= 1;
      } else {
        result *= xi;
        xi *= xi;
        // Rather than divide by 2, we can use the right bit shift operator to do a faster division.  The `>>>`
        // operation is an unsigned bit shift to the right.  This means the leftmost bits are filled with 0's regardless
        // of the sign of the original number.
        ni >>>= 1;
      }
    }

    return result;
  }

  test.skip('pow - test case 1', async () => {
    expect(__naiveMyPow(2, -2)).toBe(0.25);
  });

  test.skip('pow - test case 2', async () => {
    expect(__naiveMyPow(2, -1)).toBe(0.5);
  });

  test.skip('pow - test case 3', async () => {
    expect(__naiveMyPow(2, 0)).toBe(1);
  });

  test.skip('pow - test case 3', async () => {
    expect(__naiveMyPow(2, 1)).toBe(2);
  });

  test.skip('pow - test case 4', async () => {
    expect(__naiveMyPow(2, 4)).toBe(16);
  });

  test.skip('pow - test case 5', async () => {
    expect(__naiveMyPow(2, 5)).toBe(32);
  });

  test.skip('pow - test case 6', async () => {
    expect(__naiveMyPow(2, -2147483648)).toBe(0);
  });

  test.skip('pow - test case 7', async () => {
    expect(__fasterMyPow(2, -2)).toBe(0.25);
  });

  test.skip('pow - test case 8', async () => {
    expect(__fasterMyPow(2, -1)).toBe(0.5);
  });

  test.skip('pow - test case 9', async () => {
    expect(__fasterMyPow(2, 0)).toBe(1);
  });

  test.skip('pow - test case 10', async () => {
    expect(__fasterMyPow(2, 1)).toBe(2);
  });

  test.skip('pow - test case 11', async () => {
    expect(__fasterMyPow(2, 4)).toBe(16);
  });

  test.skip('pow - test case 12', async () => {
    expect(__fasterMyPow(2, 5)).toBe(32);
  });

  test.skip('pow - test case 13', async () => {
    expect(__fasterMyPow(2, -2147483648)).toBe(0);
  });

  test('pow - test case 14', async () => {
    expect(myPow(2, -2)).toBe(0.25);
  });

  test('pow - test case 15', async () => {
    expect(myPow(2, -1)).toBe(0.5);
  });

  test('pow - test case 16', async () => {
    expect(myPow(2, 0)).toBe(1);
  });

  test('pow - test case 17', async () => {
    expect(myPow(2, 1)).toBe(2);
  });

  test('pow - test case 18', async () => {
    expect(myPow(2, 4)).toBe(16);
  });

  test('pow - test case 19', async () => {
    expect(myPow(2, 5)).toBe(32);
  });

  test('pow - test case 20', async () => {
    expect(myPow(2, -2147483648)).toBe(0);
  });
});
