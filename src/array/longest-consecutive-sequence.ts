// DIFFICULTY: Medium
//
// Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
//
// You must write an algorithm that runs in O(n) time.
//
// See https://leetcode.com/problems/longest-consecutive-sequence/
//
// SOLUTION:
//
// The problem is phrased in a very confusing way.  The sequence doesn't ACTUALLY need to be consecutive within the
// array; it only needs to be consecutive if you plucked the sequence out of the array and sorted it.
//
// For example, [1, 500, 2, 3, 4] has consecutive elements [1, 2, 3, 4].  The fact that 500 appears in the middle
// is okay; the number 500 begins its own consecutive sequence of length 1.  The other elements [1, 2, 3, 4] create
// a sequence of length 4.
//
// Conceptually, we'll do this by throwing all the array elements into a set.  Then, for each element `x`, we can figure
// out if it's part of a sequence by repeatedly checking its predecessor `x - 1` in the set.
export function longestConsecutive(xs: number[]) {
  let longest = 0;

  // Use a set to keep track of all elements in the array; we'll reference it to find out if a predecessor to an
  // element exists as we iterate through the array.
  const set = new Set(xs);

  for (let i = 0; i < xs.length; i++) {
    let x = xs[i];

    // Suppose that the predecessor to x, x - 1, is not in the array already.  That must mean that x begins some new
    // consecutive sequence.  We will now count the length of that sequence by incrementing until we can no longer
    // find a consecutive value in the array.
    //
    // Suppose that the predecessor was found in the set.  This means that it should've been found by the inner while
    // loop, and it means we've already counted it as part of some other consecutive sequence, so we can skip x.
    if (!set.has(x - 1)) {
      let current = 1;
      x++;

      while (set.has(x)) {
        current++;
        x++;
      }

      // Now that we have the length of the longest consecutive sequence that begins at x, we compare it to the
      // longest sequence we know about.
      longest = Math.max(longest, current);
    }
  }

  return longest;
}
