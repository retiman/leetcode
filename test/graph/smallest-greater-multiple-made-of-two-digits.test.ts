// DIFFICULTY: MEDIUM
//
// Given three integers, k, digit1, and digit2, you want to find the smallest integer that is:
//
// - Larger than k,
// - A multiple of k, and
// - Comprised of only the digits digit1 and/or digit2.
//
// Return the smallest such integer. If no such integer exists or the integer exceeds the limit of a signed 32-bit
// integer (2^31 - 1), return -1.
//
// See https://leetcode.com/tag/breadth-first-search/
describe('smallest greater multiple made of two digits', () => {
  // In order to find our target number, we start with the first digit and generate all possible 2 digit numbers.  Then
  // from there we generate all possible 3 digit numbers, and so on.  We also go back to checking the second digit,
  // generating 2 digit, 3 digit, etc numbers.
  //
  // This can be done via a graph search algorithm.  However, since we want to find the smallest such number, we should
  // use BFS instead of DFS.
  function findInteger(k: number, digit1: number, digit2: number): number {
    const queue: string[] = [];
    const seen = new Set<string>();

    // We always want to start generating numbers from the smaller digit first, so let's rearrange them so that the
    // smaller digit is digit1.
    if (digit2 < digit1) {
      [digit1, digit2] = [digit2, digit1];
    }

    // For the first digits, do not push a 0, because generating a number starting at 0 is the same as generating a
    // number using the rest of the digits.
    if (digit1 !== 0) {
      queue.push(`${digit1}`);
      seen.add(`${digit1}`);
    }

    if (digit2 !== 0 && digit1 !== digit2) {
      queue.push(`${digit2}`);
      seen.add(`${digit2}`);
    }

    const max = 2 ** 31 - 1;
    while (queue.length > 0) {
      const s = queue.shift()!;
      const value = Number.parseInt(s, 10 /* radix */);
      if (value > max) {
        continue;
      }

      // Check if this number is both larger than k and a multiple of k; if so we have reached our target.
      if (value > k && value % k === 0) {
        return value;
      }

      // Otherwise, mark this number as visited and use the digits to construct our frontier nodes.
      const next1 = `${s}${digit1}`;
      if (!seen.has(next1)) {
        queue.push(next1);
        seen.add(next1);
      }

      // We know that by adding in this order, the smaller number gets added first (since digit1 < digit2).
      const next2 = `${s}${digit2}`;
      if (!seen.has(next2)) {
        queue.push(next2);
        seen.add(next2);
      }
    }

    return -1;
  }

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
