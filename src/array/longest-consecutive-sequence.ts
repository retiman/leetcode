// DIFFICULTY: Medium
//
// Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
//
// You must write an algorithm that runs in O(n) time.
//
// See {@link https://leetcode.com/problems/longest-consecutive-sequence/}
export { longestConsecutive };

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
//
// COMPLEXITY:
//
// Runs in O(n) time.  It may appear that the inner loop runs multiple times, but each element in the array is only
// processed once; the inner loop will skip `x - 1` if it was already part of some other sequence from a previous
// iteration.
function longestConsecutive(xs: number[]) {
  let longest = 0;

  // Use a set to keep track of all elements in the array; we'll reference it to find out if a predecessor to an
  // element exists as we iterate through the array.
  const set = new Set(xs);

  for (let i = 0; i < xs.length; i++) {
    // Let us consider if element x is part of some sequence.  We can do this by considering its predecessor, x - 1.
    let x = xs[i];

    // If x - 1 is not in the set, x must begin some new sequence.  Let's find out how long it is by incrementing x
    // until we can't find any more consecutive elements.
    if (!set.has(x - 1)) {
      let length = 1;
      x++;

      // Continue to increment x and look for consecutive elements in the set.
      while (set.has(x)) {
        length++;
        x++;
      }

      // Once we run out of elements, we have determined the length of the sequence between at x.  We'll compare it to
      // the longest sequence we've found so far.
      longest = Math.max(longest, length);
    } else {
      // If x - 1 is in the set, we know it is part of some sequence.  However, this sequence must've already been
      // found by the inner loop above, so we can skip this element.
    }
  }

  return longest;
}
