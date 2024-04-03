describe('closest three elements to sum', () => {
  // Finds the 3 elements whose sum is closest to the target number.
  //
  // Algorithm is O(n^2) because the sorting is O(nlogn), and we have a nested loop.
  function run(xs: number[], target: number): number[] {
    xs.sort((a, b) => a - b);

    let closestSum = Infinity;
    let closestValues: number[] = [];

    for (let i = 0; i < xs.length - 2; i++) {
      // Use the two pointer technique to find the closest triple.
      let left = i + 1;
      let right = xs.length - 1;

      while (left < right) {
        // If the current sum is closer than what we have, update the closest sum and the triple.
        const currentSum = xs[i] + xs[left] + xs[right];
        const currentDistance = Math.abs(currentSum - target);
        const closestDistance = Math.abs(closestSum - target);
        if (currentDistance < closestDistance) {
          closestSum = currentSum;
          closestValues = [xs[i], xs[left], xs[right]];
        }

        // If we've matched the target sum, just return right away.
        if (closestSum === target) {
          return closestValues;
        }

        // Update the left and right pointers, and try again.
        if (currentSum < target) {
          left++;
        } else {
          right--;
        }
      }
    }

    return closestValues;
  }

  test('run', async () => {
    expect(run([-1, 2, 1, -4, 5], 1)).toStrictEqual([-4, -1, 5]);
  });
});
