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
export { twoSum };

// SOLUTION:
//
// Use a hashmap to keep track of values we've already seen.  This lets us avoid the O(n^2) solution of checking every
// possible pair of values.
//
// When iterating, you can check if the complement nums[j] = target - nums[i] already exists in the hashmap.  If it
// does then we've found the solution and can return the indices immediately.
function twoSum(xs: number[], target: number) {
  type Index = number;
  type Complement = number;
  const m = new Map<Complement, Index>();

  for (let i = 0; i < xs.length; i += 1) {
    const x = xs[i];
    const y = target - x;

    // If our map has the complementary value that would make up the target, we can return it immediately.
    if (m.has(y)) {
      return [i, m.get(y)];
    }

    // Otherwise, store the number and its index in the map.  If we find the complement later, then this index will be
    // the complement's complement and we can return the indices as normal.
    m.set(x, i);
  }

  return [];
}
