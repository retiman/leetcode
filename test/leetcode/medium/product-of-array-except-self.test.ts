// CATEGORY: Array
//
// Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements
// of nums except nums[i].
//
// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
//
// You must write an algorithm that runs in O(n) time and without using the division operation.
//
// See https://leetcode.com/problems/product-of-array-except-self/
describe('product of array except self', () => {
  function productExceptSelf(xs: number[]): number[] {
    // Getting the product of the entire array, and then dividing by each element works, unless the array has any
    // zeroes.
    //
    // So instead, get the product of the non-zero elements and record how many zeroes we saw.
    let zeroes = 0;
    const product = xs.reduce((a, b) => {
      if (b === 0) {
        zeroes++;
        return a;
      }

      return a * b;
    }, 1 /* initialValue */);

    const result: number[] = [];
    for (let i = 0; i < xs.length; i++) {
      const x = xs[i];

      // Without any zeroes in the input array, the product except self is just the product divided by self.
      if (zeroes === 0) {
        result.push(product / x);
        continue;
      }

      // If there is a single zero in the, the product except self is zero, unless the element itself is zero.
      if (zeroes === 1) {
        result.push(x === 0 ? product : 0);
      }

      // If multiple elements are zero, then the product except self will always be zero no matter what.
      if (zeroes > 1) {
        result.push(0);
        continue;
      }
    }

    return result;
  }

  test('run', async () => {
    expect(productExceptSelf([0, 2, 3, 4])).toStrictEqual([24, 0, 0, 0]);
    expect(productExceptSelf([1, 2, 3, 4])).toStrictEqual([24, 12, 8, 6]);
  });
});
