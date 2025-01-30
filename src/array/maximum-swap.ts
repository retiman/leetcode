// DIFFICULTY: MEDIUM
//
// You are given an integer num. You can swap two digits at most once to get the maximum valued number.
//
// Return the maximum valued number you can get.
//
// See {@link https://leetcode.com/problems/maximum-swap/}
export { maximumSwap };

// SOLUTION:
//
// The simple idea of swapping the largest number with the first digit doesn't always work.  It works a lot of the time,
// but a couple of cases mess up this algorithm:
//
// - 98368 would stay 98368; we need to swap the 3 and 8 to get 98863.
// - 1993 could become 9193, but we need to swap the 1 and other 9 to get 9913.
//
// The way to think about this is:
//
// 1. Find the FIRST digit that can be made bigger (larger digits appear later).
// 2. Swap it with the LAST occurrence of the largest digit.
//
// COMPLEXITY:
//
// The time complexity is O(n) where n is the number of digits.  We iterate through the digits once to create our array
// and map.  We iterate through the digits a second time to find the swap point.  There is a nested loop, but the inner
// loop is bounded by the 10 digits, so it doesn't cause O(n^2) time complexity.
//
// The space complexity is O(n) because we store an array and map of the digits.
function maximumSwap(num: number): number {
  // First convert the number to an array of digits.
  const digits = num.toString().split('').map(Number);

  // Create a map of the last seen index of each digit.  Use this to find out the last occurrence of any digit.
  type Digit = number;
  type LastSeen = number;
  const map = new Map<Digit, LastSeen>();
  for (let i = 0; i < digits.length; i++) {
    const digit = digits[i];
    map.set(digit, i);
  }

  // Find the first digit that can be made bigger by iterating through the digits list.
  for (let i = 0; i < digits.length; i++) {
    const smaller = digits[i];

    // Find a larger digit to swap the smaller digit with.  To do so, start at 9 and iterate downwards until we find a
    // digit that is larger, and appears later in the number.
    for (let larger = 9; larger >= 0; larger--) {
      // Skip the digit if it's not larger.
      if (larger <= smaller) {
        break;
      }

      // Skip the digit if it doesn't appear at all.
      if (!map.has(larger)) {
        continue;
      }

      // Skip the digit if it appears before the smaller digit.
      const j = map.get(larger)!;
      if (j <= i) {
        continue;
      }

      // Success!  We have found the largest digit that occurs as late as possible!  Swap the digits and return the
      // number.
      [digits[i], digits[j]] = [digits[j], digits[i]];
      return Number(digits.join(''));
    }
  }

  // We made no swaps, so just return the number as is.
  return num;
}
