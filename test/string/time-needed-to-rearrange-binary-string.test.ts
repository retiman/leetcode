// DIFFICULTY: Medium
//
// You are given a binary string s. In one second, all occurrences of "01" are simultaneously replaced with "10". This
// process repeats until no occurrences of "01" exist.
//
// Return the number of seconds needed to complete this process.
//
// See https://leetcode.com/problems/time-needed-to-rearrange-a-binary-string/
describe('time needed to rearrange a binary string', () => {
  // Rather than simulate the replacement process, we can think about how the replacement affects a string.  In a simple
  // case, "01" -> "10".  However, a newly created "10" can create more replacements.  Here's an example:
  //
  // "0001" -> "0010" -> "0100" -> "1000" (three 0's and three seconds to flip)
  //
  // Here' the "10" ripples to the left.  The number of times it will "ripple" is determined by the number of 0's to
  // the left of the 1.  Here there are three 0's before the 1, so it will take 3 seconds to complete the replacement.
  //
  // Here's a more complicated example:
  //
  // "001001" -> "010010" -> "100100" -> "101000" -> "110000" (four 0's and four seconds to flip)
  //
  // Notice that the first "001" only takes two seconds to transform into "100", but we are not done yet.  The second
  // "001" took 4 seconds to replace, which is the two 0's in front of "001", but also the two 0's that were in front
  // of the first "001".  In essence, the first "001" -> "100" transferred the 0's to the right, which the second "001"
  // has to deal with.
  //
  // This means the number of seconds it takes to replace the rightmost "01" is equal to the number of 0's that appeared
  // to the left of it, in most cases.  However, this won't work for a case like this:
  //
  // "011" -> "101" -> "110" (one 0 and two seconds to flip)
  //
  // Here, there is one 0 but two seconds needed to elapse.  This is because the second 1 cannot flip until the first
  // "01" has flipped.  We don't have this issue if we space out 0's and 1's:
  //
  // "101" -> "110" (one 0 and one second to flip)
  // "0101" -> "1010" -> "1100" (two 0's and two seconds to flip)
  //
  // This means that each 1 we see requires at LEAST one second to flip.
  function secondsToRemoveOccurrences(s: string): number {
    let count = 0;
    let seconds = 0;

    for (let i = 0; i < s.length; i++) {
      // This counts how many 0's we have seen so far.
      if (s[i] === '0') {
        count++;
        continue;
      }

      // If we see a 1 and we haven't seen any 0's before this, we don't need to update the number of seconds.  That is,
      // "1111..." will not result in increasing the number of seconds.
      if (count === 0) {
        continue;
      }

      // Here we have seen a 1, and there are some number of zeroes before it.  Keep in mind that in most cases, we can
      // calculate that count of zeroes = count of seconds.  However, each 1 requires at LEAST one second to flip.
      //
      // To handle a case of "011" -> "101" -> "110" which has one 0, but requires TWO seconds to flip, we should
      // compare: seconds + 1 (at LEAST one second to flip) versus the count of zeroes.
      seconds = Math.max(seconds + 1, count);
    }

    return seconds;
  }

  // There are two ways we could go about this; we could simulate the replacement process, or we can compute the actual
  // value without bothering to simulate.  This naive approach will simulate the replacement process.
  function naiveSecondsToRemoveOccurrences(s: string): number {
    let current = s;
    let next = '';
    let replaced = true;
    let seconds = 0;

    // Simulate the replacement process; we're going to do it at least once.
    while (replaced) {
      replaced = false;

      // Examine each character and take action to replace 01 with 10 if we see a 0.  If we don't, just append the
      // character onto the next string.
      for (let i = 0; i < current.length - 1; i++) {
        if (current[i] === '0' && current[i + 1] === '1') {
          next += '10';
          i++;
          replaced = true;
          continue;
        }

        next += current[i];
      }

      // Since we are looking at all characters but the last one, we might end up missing the last one.  Since we are
      // replacing a 2 character substring with another 2 character substring, the current string length and next string
      // length must remain the same.
      if (next.length < current.length) {
        next += current[current.length - 1];
      }

      // If we did replace any values, we should simulate the replacement again.
      if (replaced) {
        current = next;
        next = '';
        seconds++;
      }
    }

    return seconds;
  }

  test('naive time needed to rearrange a binary string - test case 1', async () => {
    expect(naiveSecondsToRemoveOccurrences('0110101')).toBe(4);
  });

  test('time needed to rearrange a binary string - test case 1', async () => {
    expect(secondsToRemoveOccurrences('0110101')).toBe(4);
  });
});
