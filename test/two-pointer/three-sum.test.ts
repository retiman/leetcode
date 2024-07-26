// DIFFICULTY: Medium
//
// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that
// i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
//
// Notice that the solution set must not contain duplicate triplets.
//
// See https://leetcode.com/problems/3sum/
describe('three sum', () => {
  // The two sum problem can be solved with a two pointer approach.  This can be solved with a similar approach, but
  // you'll need to apply the two pointer approach to every element in the array.
  function threeSum(xs: number[]) {
    const result: number[][] = [];

    // Note that xs.sort() will sort by string value.  So if you have negative numbers, something like [-1, -2, 0] is
    // considered "sorted".  To fix this, make sure to explicitly provide a compare function.
    xs.sort((a, b) => a - b);

    for (let i = 0; i < xs.length - 2; i++) {
      // Because we can't have duplicate triples in the result, we should just skip over any duplicates.
      if (i > 0 && xs[i] === xs[i - 1]) {
        continue;
      }

      // For each element b, use the two pointers technique to find (a, c) such that a + b + c = 0.
      const b = xs[i];

      // We cannot have duplicate triples in the result.  We can do this by setting the left pointer to 0, and the right
      // pointer to the last element, tightening the bounds as we consider sums.  However, this will reconsider
      // duplicate triples as i advances.  We would need a set to dedupe the triples.
      //
      // Starting the left pointer at i + 1 avoids this problem.
      let left = i + 1;
      let right = xs.length - 1;
      while (left < right) {
        const a = xs[left];
        const c = xs[right];
        const sum = a + b + c;

        // If the sum isn't the target of 0, narrow the left or right pointers.
        if (sum < 0) {
          left++;
          continue;
        }

        if (sum > 0) {
          right--;
          continue;
        }

        // If the sum is the target of 0, add the triple to the result array.
        if (sum === 0) {
          result.push([a, b, c]);

          // Continue narrowing the left and right pointers to find additional triples with the current index.  When we
          // narrow, we have to skip over any duplicates since we don't want to represent them twice in the triples
          // array.
          while (left < right && xs[left + 1] === xs[left]) {
            left++;
          }

          while (left < right && xs[right - 1] === xs[right]) {
            right--;
          }

          left++;
          right--;
        }
      }
    }

    return result;
  }

  test('three sum test case 1', async () => {
    expect(threeSum([-1, 0, 1, 2, -1, -4])).toMatchSnapshot();
    expect(threeSum([-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4])).toMatchSnapshot();
  });
});
