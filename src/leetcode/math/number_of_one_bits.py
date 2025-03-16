# DIFFICULTY: EASY
#
# Write a function that takes the binary representation of a positive integer and returns the number of set bits it has
# (also known as the Hamming weight).
#
# See https://leetcode.com/problems/number-of-1-bits
class Solution:
    def hammingWeight(self, n: int) -> int:
        """
        SOLUTION
        --------

        Use the bitwise AND operator to check if the rightmost bit is set.  If it is, increment the count of one bits,
        then right shift by one to remove the rightmost bit.  Repeat this process until there are no more bits.

        COMPLEXITY
        ----------

        Time complexity is O(1) because the number of bits in an integer is technically fixed.  Or it's O(m) where m is
        the number of bits to check.

        Space complexity is O(1).
        """
        count = 0

        while n:
            # This will be true if the least significant bit is set.
            if n & 1:
                count += 1

            # Right shift by one to remove the least significant bit.
            n >>= 1

        return count
