// CATEGORY: Array
//
// Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
//
// You must write an algorithm that runs in O(n) time.
//
// See https://leetcode.com/problems/longest-consecutive-sequence/
describe('longest consecutive sequence', () => {
  // Note that the sequence does not need to be consecutive in the array; the numbers in the sequence only need to
  // appear in the array.
  function longestConsecutive(xs: number[]) {
    const set = new Set(xs);

    let longest = 0;
    for (let i = 0; i < xs.length; i++) {
      let x = xs[i];

      // If the array does not contain x - 1, then x must begin a new consecutive sequence.  If it does, it was part of
      // some other previous sequence that we've already checked.
      if (!set.has(x - 1)) {
        // Start counting elements in this sequence beginning with the next consecutive number after x.
        let current = 1;
        x++;

        while (set.has(x)) {
          current++;
          x++;
        }

        longest = Math.max(longest, current);
      }
    }

    return longest;
  }

  test('run', async () => {
    expect(longestConsecutive([100, 4, 200, 1, 3, 2])).toBe(4);
  });
});
