// Given two sparse vectors, compute their dot product.
//
// Implement class SparseVector:
//
// - SparseVector(nums) Initializes the object with the vector nums
// - dotProduct(vec) Compute the dot product between the instance of SparseVector and vec
//
// A sparse vector is a vector that has mostly zero values, you should store the sparse vector efficiently and compute
// the dot product between two SparseVector.
//
// Follow up: What if only one of the vectors is sparse?
//
// See {@link https://leetcode.com/problems/dot-product-of-two-sparse-vectors/}
export { SparseVector };

// SOLUTION:
//
// If the vector is sparse, just store the non-zero values in a map of index to value.  That will compress for storage;
// to compute the dot product you can either decompress and then do the dot product, or you can do the multiplication
// over the non-zero values directly.
//
// Doing it without decompression is more efficient, and we should start with the smaller vector to minimize the number
// of operations.
class SparseVector {
  private readonly map: Map<number, number>;

  constructor(nums: number[]) {
    // This does the compression.
    this.map = new Map();
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] !== 0) {
        this.map.set(i, nums[i]);
      }
    }
  }

  dotProduct(vec: SparseVector): number {
    // Get the vectors in order of size; we'll iterate over the smaller vector.
    const [a, b] = this.sorted(this.map, vec.map);

    // Iterate over the smaller vector and multiply the values, only if the larger vector has the same index.
    let result = 0;
    for (const [i, ai] of a) {
      if (!b.has(i)) {
        continue;
      }

      const bi = b.get(i)!;
      result += ai * bi;
    }

    return result;
  }

  // If one vector is dense, don't bother compressing it.  Just compute directly.
  dotProductDense(b: number[]) {
    let result = 0;
    for (const [i, ai] of this.map) {
      const bi = b[i];
      result += ai * bi;
    }

    return result;
  }

  private sorted(a: Map<number, number>, b: Map<number, number>): [Map<number, number>, Map<number, number>] {
    return a.size < b.size ? [a, b] : [b, a];
  }
}
