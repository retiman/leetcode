// DIFFICULTY: Easy
//
// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to
// target.
//
// You may assume that each input would have exactly one solution, and you may not use the same element twice.
//
// You can return the answer in any order.
//
// See {@link https://leetcode.com/problems/two-sum/}
export { find };

// SOLUTION:
function find(xs: number[], target: number) {
  // Do the same as before but use a hashmap to keep track of values we've already seen.
  type Index = number;
  type Complement = number;
  const m = new Map<Complement, Index>();

  for (let i = 0; i < xs.length; i += 1) {
    const x = xs[i];
    const y = target - x;

    // If our map has the complentary value that would make up the target, we can return it immediately.
    if (m.has(y)) {
      return [i, m.get(y)];
    }

    // Otherwise, loop through the list as usual.
    for (let j = i + 1; j < xs.length; j += 1) {
      const z = xs[j];
      m.set(z, j);

      if (x + z === target) {
        return [i, j];
      }
    }
  }

  return [];
}
