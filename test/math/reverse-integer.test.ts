// DIFFICULTY: MEDIUM
//
// Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the
// signed 32-bit integer range [-231, 231 - 1], then return 0.
//
// Assume the environment does not allow you to store 64-bit integers (signed or unsigned).
//
// See https://leetcode.com/problems/reverse-integer/
describe('reverse integer', () => {
  // You can do this by reversing a string, but you can also just do this with arithmetic.
  function reverse(x: number) {
    // There is no builtin const for this, but you can calculate the min 32 bit value like this (31 bits due to sign).
    const min = -1 * 2 ** 31;
    // There is no builtin const for this, but you can calculate the min 32 bit value like this (31 bits due to sign).
    // Minus 1 to account for 0.
    const max = 2 ** 31 - 1;
    const sign = x > 0 ? 1 : -1;

    let n = Math.abs(x);
    let r = 0;
    while (n > 0) {
      // Get the least significant digit of N; this will be the most significant digit of R in the first iteration,
      // the second most in the next iteration, and so on.
      const lastDigit = n % 10;

      if (r === 0) {
        // When r === 0, just make last digit the most significant digit.
        r = lastDigit;
      } else {
        // Otherwise shift R to the left by 10, then add the last digit we got from N.
        r = r * 10 + lastDigit;
      }

      // Shift N to the right by 10 so we drop the last digit, then go to the next iteration.
      n = Math.floor(n / 10);
    }

    const value = sign * r;
    if (value < min || value > max) {
      return 0;
    }

    return sign * r;
  }

  test('reverse integer - test case 1', async () => {
    expect(reverse(123)).toBe(321);
  });
});
