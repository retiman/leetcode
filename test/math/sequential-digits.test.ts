// DIFFICULTY: Medium
//
// An integer has sequential digits if and only if each digit in the number is one more than the previous digit.
//
// Return a sorted list of all the integers in the range [low, high] inclusive that have sequential digits.
//
// See https://leetcode.com/problems/sequential-digits/
describe('sequential digits', () => {
  // Rather than take a list from low to high and filtering out the numbers that match our criteria, it will be much
  // faster to generate a list of numbers with this quality with the correct number of digits, then filter out by low
  // and high ranges.
  function sequentialDigits(low: number, high: number) {
    const results: number[] = [];

    // Sequential digits end at 9, so the largest sequential number you can have is 123456789.  Start generating them
    // at i = 1.  We'll handle 0 in a special case.
    for (let i = 1; i < 9; i++) {
      // Set the value to be xxxi, and the next digit following xxxi to be i + 1.  We will append i + 1 to the end of
      // this number.
      let value = i;
      let next = i + 1;

      while (next <= 9 && value <= high) {
        // Shift the current number's digits over to the left, leaving a 0 in the one's place.
        value *= 10;

        // Add the next digit to the one's place.
        value += next;
        next++;

        // If it's within bounds, add it to the array.
        if (value >= low && value <= high) {
          results.push(value);
        }
      }
    }

    // The above logic doesn't handle the sequential digit number 0; so add it if necessary.
    if (low === 0) {
      results.push(0);
    }

    results.sort((a, b) => a - b);
    return results;
  }

  test('sequential digits - test case 1', async () => {
    expect(sequentialDigits(100, 300)).toMatchSnapshot();
  });

  test('sequential digits - test case 2', async () => {
    expect(sequentialDigits(1000, 13000)).toMatchSnapshot();
  });
});
