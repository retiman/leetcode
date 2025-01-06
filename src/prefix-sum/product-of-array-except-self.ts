// DIFFICULTY: MEDIUM
//
// Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements
// of nums except nums[i].
//
// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
//
// You must write an algorithm that runs in O(n) time and without using the division operation.
//
// See {@link https://leetcode.com/problems/product-of-array-except-self/}
export { productExceptSelf };

// SOLUTION:
//
// If we could use division, we could just compute the product of the array (excluding zeroes), then we can divide the
// non-zero product by the current element if there were no zeroes, return the non-zero product if there were zeroes,
// or just return zero if there were multiple zeroes.
//
// Without using division, we'll have to use more space to compute the product-except-self in each array index.  To
// do this, we have to construct two new arrays:
//
// - One array to hold the partial product of all elements before, but not including element i, called `prefix`.
//   This array is a "prefix product", analogous to the "prefix sum" computational technique used preprocess an array
//   for quick range queries.
// - One array to hold the partial product of all elements after, but not including element i, called `suffix`.
//   This array is a "suffix product", analogous to the "suffix sum" computational technique used to preprocess an
//   array for quick range queries.
//
// To compute the product-except-self, the ith value will be `befores[i] * afters[i]`.
//
// This isn't exactly a prefix sum problem, but well, close enough.
function productExceptSelf(xs: number[]): number[] {
  if (xs.length === 0) {
    return [];
  }

  // Compute the product up to the ith index.
  const prefix = Array(xs.length).fill(1);
  for (let i = 1; i < xs.length; i++) {
    prefix[i] = prefix[i - 1] * xs[i - 1];
  }

  // Compute the product after the ith index.
  const suffix = Array(xs.length).fill(1);
  for (let i = xs.length - 2; i >= 0; i--) {
    suffix[i] = suffix[i + 1] * xs[i + 1];
  }

  // Compute the product except for the element at the ith index.
  const products = Array(xs.length).fill(0);
  for (let i = 0; i < xs.length; i++) {
    products[i] = prefix[i] * suffix[i];
  }

  return products;
}
