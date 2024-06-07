describe('find two sum in sorted array', () => {
  // If the array is not sorted, we can create a map to store the complement of the sum as we iterate through the list.
  // That method will also run in O(1) but requires some extra memory for the map.
  function run(xs: number[], target: number): number[] {
    // Attempt to find two elements that sum to the target.  Because the list is sorted, we can start with two pointers
    // at the beginning and end of the list, and narrow them accordingly as we look for the sum.
    for (let left = 0, right = xs.length - 1; left < right; ) {
      const current = xs[left] + xs[right];

      // If we have found the target, simply return it.
      if (current === target) {
        return [left, right];
      }

      // If we don't have a match, move the left pointer to the right, or move the right pointer to the left.
      if (current < target) {
        left++;
      } else {
        right--;
      }
    }

    // This means we didn't find any two elements that summed to the target.
    return [];
  }

  test('run', async () => {
    expect(run([2, 7, 11, 15], 9)).toStrictEqual([0, 1]);
    expect(run([2, 7, 11, 15], 22)).toStrictEqual([1, 3]);
    expect(run([2, 7, 11, 15], 8)).toStrictEqual([]);
  });
});
