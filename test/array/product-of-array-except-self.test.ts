// DIFFICULTY: Medium
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
  // If we could use division, we could just compute the product of the array (excluding zeroes), then we can divide the
  // non-zero product by the current element if there were no zeroes, return the non-zero product if there were zeroes,
  // or just return zero if there were multiple zeroes.
  //
  // Without using division, we'll have to use more space to compute the product-except-self in each array index.  To
  // do this, we have to construct two new arrays:
  //
  // - One array to hold the partial product of all elements before, but not including element i, called `befores`.
  // - One array to hold the partial product of all elements after, but not including element i, called `afters`.
  //
  // To compute the product-except-self, the ith value will be `befores[i] * afters[i]`.
  function productExceptSelf(xs: number[]): number[] {
    if (xs.length === 0) {
      return [];
    }

    // Compute the product up to the ith index.
    const befores = Array(xs.length).fill(1);
    for (let i = 1; i < xs.length; i++) {
      befores[i] = befores[i - 1] * xs[i - 1];
    }

    // Compute the product after the ith index.
    const afters = Array(xs.length).fill(1);
    for (let i = xs.length - 2; i >= 0; i--) {
      afters[i] = afters[i + 1] * xs[i + 1];
    }

    // Compute the product except for the element at the ith index.
    const products = Array(xs.length).fill(0);
    for (let i = 0; i < xs.length; i++) {
      products[i] = befores[i] * afters[i];
    }

    return products;
  }

  test('run', async () => {
    expect(productExceptSelf([0, 2, 3, 4])).toStrictEqual([24, 0, 0, 0]);
    expect(productExceptSelf([1, 2, 3, 4])).toStrictEqual([24, 12, 8, 6]);
  });
});
