describe('max sum of subarray of size k', () => {
  function run(xs: number[], k: number): number {
    // Start with an initial guess of the first k elements.
    let left = 0;
    let right = 0;
    let current = 0;
    while (right < k) {
      current += xs[right];
      right++;
    }

    // Move both the left and right pointers to the right, maintaining a window of size k, and compute the new sum.
    let max = -Infinity;
    while (right < xs.length) {
      // Compute the new sum.
      current += xs[right];
      current -= xs[left];
      max = Math.max(current, max);

      // Shift the window.
      left++;
      right++;
    }

    return max;
  }

  test('run', async () => {
    expect(run([1, -3, 4, -2, 3, -1, 2, 6, -5], 3)).toStrictEqual(7);
    expect(run([1, -3, 4, -2, 3, -1, 2, 6, -5], 0)).toStrictEqual(0);
  });
});
