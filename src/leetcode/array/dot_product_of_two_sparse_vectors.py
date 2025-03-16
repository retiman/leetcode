# DIFFICULTY: MEDIUM
# ------------------
#
# Given two sparse vectors, compute their dot product.
#
# Implement class SparseVector:
#
# - SparseVector(nums) Initializes the object with the vector nums
# - dotProduct(vec) Compute the dot product between the instance of SparseVector and vec
#
# A sparse vector is a vector that has mostly zero values, you should store the sparse vector efficiently and compute
# the dot product between two SparseVector.
#
# Follow up: What if only one of the vectors is sparse?
#
# See https://leetcode.com/problems/dot-product-of-two-sparse-vectors
class SparseVector:
    def __init__(self, nums: list[int]) -> None:
        """
        SOLUTION
        --------

        If the vector is sparse, just store the non-zero values in a map of index to value.  That will compress for
        storage; to compute the dot product you can either decompress and then do the dot product, or you can do the
        multiplication over the non-zero values directly.

        Doing it without decompression is more efficient, and we should start with the smaller vector to minimize the
        number of operations.

        COMPLEXITY
        ----------

        Time complexity is O(k) in the best case, where k is the number of non-zero elements.  In the worst case,
        though, it could still be O(n) if both vectors are dense.

        Space complexity is O(k) in the best case, where k is the number of non-zero elements.
        """
        # This compresses the vector so that non-zero values are mapped.
        self.map: dict[int, int] = {i: num for i, num in enumerate(nums) if num != 0}

    def dotProduct(self, vec: "SparseVector") -> int:
        # Get the vectors in order of size; we'll iterate over the smaller vector.
        (smaller, larger) = (self.map, vec.map) if len(self.map) < len(vec.map) else (vec.map, self.map)

        result = 0
        for i, value in smaller.items():
            if i in larger:
                result += value * larger[i]

        return result
