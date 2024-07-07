// DIFFICULTY: Medium
//
// Given an array of integers called nums, you can perform any of the following operation while nums contains at least
// 2 elements:
//
// - Choose the first two elements of nums and delete them.
// - Choose the last two elements of nums and delete them.
// - Choose the first and the last elements of nums and delete them.
//
// The score of the operation is the sum of the deleted elements.
//
// Your task is to find the maximum number of operations that can be performed, such that all operations have the same
// score.
//
// Return the maximum number of operations possible that satisfy the condition mentioned above.
//
// See https://leetcode.com/problems/maximum-number-of-operations-with-the-same-score-ii/
describe('maximum number of operations with the same score', () => {
  // The range of possible scores is determined by applying the operation once.  Subsequent operations must produce the
  // same score, so there are only three possible operations.  For each operation, we should apply them, then follow
  // paths of operations that result in the same score until the array is exhausted.
  //
  // We COULD use the sliding window technique by applying each operation and then only following the operation paths
  // that have the same score as the one we are considering.  However, this would only work if at each choice of three
  // operations, the scores are unique.  If there are two or more choices with the same score, then we need to explore
  // multiple operation paths at once.
  //
  // To explore multiple operation paths at once, we'll need to use a backtracking approach.
  function maxOperations(nums: number[]): number {
    if (nums.length < 2) {
      return 0;
    }

    // These are the range of possible scores we can have as we truncate the array.
    const scores = new Set<number>();
    scores.add(nums[0] + nums[1]);
    scores.add(nums[nums.length - 1] + nums[nums.length - 2]);
    scores.add(nums[0] + nums[nums.length - 1]);

    // There is an opportunity for optimization when using backtracking.  We can maintain a memoization table to keep
    // track of previously computed values.
    const memo = new Map<string, number>();

    // Adapt the sliding window approach so we can explore multiple paths at once by backtracking.
    function backtrack(score: number, left: number, right: number, paths: number): number {
      if (left >= right) {
        return paths;
      }

      // Check the memoization table to see if we've previously computed this value.
      const key = `${score},${left},${right}`;
      if (memo.has(key)) {
        return memo.get(key)!;
      }

      // This is the local max count, after exploring all possible paths.
      let local = paths;

      // Check if the first 2 elements are equal to the score, and if the left and right indices are in range.
      //
      // To be in range, the array must at least look like this: [left, left + 1/right].
      if (left + 1 <= right && nums[left] + nums[left + 1] === score) {
        local = Math.max(local, backtrack(score, left + 2, right, paths + 1));
      }

      // Check if the last 2 elements are equal to the score, and if the left and right indices are in range.
      //
      // To be in range, the array must at least look like this: [left/right - 1, right]
      if (left <= right - 1 && nums[right] + nums[right - 1] === score) {
        local = Math.max(local, backtrack(score, left, right - 2, paths + 1));
      }

      // Check if the first and last elements are equal to the score, and if the left and right indices are in range.
      //
      // To be in range, the array must at least look like this: [left, right]
      if (left < right && nums[left] + nums[right] === score) {
        local = Math.max(local, backtrack(score, left + 1, right - 1, paths + 1));
      }

      // Cache the result for a future computation.
      memo.set(key, local);
      return local;
    }

    // For each score, check how many times we can keep applying operations.  To perform a map, we'
    const list = [...scores];
    const maxes = list.map(score => backtrack(score, 0 /* left */, nums.length - 1 /* right */, 0 /* paths */));
    return maxes.reduce((a, b) => Math.max(a, b));
  }

  test('test case 1', async () => {
    expect(maxOperations([3, 2, 1, 2, 3, 4])).toBe(3);
  });

  test('test case 2', async () => {
    expect(maxOperations([3, 2, 6, 1, 4])).toBe(2);
  });

  test('test case 3', async () => {
    expect(maxOperations([3, 2, 1, 4, 1])).toBe(2);
  });
});
