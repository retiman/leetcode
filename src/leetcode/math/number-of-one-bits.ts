// DIFFICULTY: EASY
//
// Write a function that takes the binary representation of a positive integer and returns the number of
// set bits it has (also known as the Hamming weight).
//
// See {@link https://leetcode.com/problems/number-of-1-bits/}
export { hammingWeight };

// SOLUTION:
//
// Note that the problem here says it "takes the binary representation" of a positive integer.  However, the signature
// of the solution takes a number argument, not a string.
//
// This solution takes a number, converts it to a string, then does the calculation.  But it's likely the interviewer
// will be asking for bit manipulation.
function hammingWeight(n: number) {
  let count = 0;

  while (n !== 0) {
    // This will be true if the least significant bit (the one all the way on the right) is 1.
    if (n & 1) {
      count++;
    }

    // Do an unsigned shift to the right (so that the most sigificant bit becomes 0), and so that the bit we just
    // counted (the least significant bit) gets shifted off.
    n >>>= 1;
  }

  return count;
}
