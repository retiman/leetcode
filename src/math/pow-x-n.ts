// DIFFICULTY: Medium
//
// Implement pow(x, n), which calculates x raised to the power n (i.e., xn).
//
// See {@link https://leetcode.com/problems/powx-n/}
export { myPow };

// SOLUTION:
//
// The faster solution is based on the concept of exponentiation by squaring.  Basically, we can reduce the number of
// multiplications if we notice that:
//
// x^n = (x^2)^(n/2)     if x n is even
// x^n = x * (x^(n-1)/2) if n is odd
//
// Exponentiation by squaring is faster because the naive method requires n multiplications, but squaring each
// time only requires log(n) multiplications.  To implement this:
//
// 1. Check if n is negative.  If it is, then we can just invert x and make n positive.
// 2. Check if n === 0.  If it is, then we can just return 1.
// 3. Check if n is even.  If it is, then we can return myPow(x * x, n / 2).  That is, square the number and half the
//    exponent.
// 4. Check if n is odd.  If it is, we can do the same thing, except just return x * myPow(x * x, (n - 1) / 2).  That
//    is, we half the exponent minus 1 to make it even (so we can do our squaring), then multiply the result by x.
//
// This can be done even faster if we use bit shift operations and convert the recursive solution to an iterative one.
function myPow(x: number, n: number) {
  if (n === 0) {
    return 1;
  }

  let xi = x;
  let ni = n;

  // Check if n is negative.  If it is, then we can just invert x and make n positive, then continue as normal.
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
