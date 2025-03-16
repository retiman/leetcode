# DIFFICULTY: MEDIUM
#
# Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the
# signed 32-bit integer range [-231, 231 - 1], then return 0.
#
# Assume the environment does not allow you to store 64-bit integers (signed or unsigned).
#
# See https://leetcode.com/problems/reverse-integer
class Solution:
    def reverse(self, x: int) -> int:
        """
        SOLUTION
        --------

        The medium level solution assumes we are reversing with arithmetic operations and not converting to a string.

        COMPLEXITY
        ----------

        Time complexity is O(log n) where n is the number of digits in x.

        Space complexity is O(1).
        """
        min_value = -1 * 2**31
        max_value = 2**31 - 1
        sign = 1 if x >= 0 else -1

        n = abs(x)
        r = 0
        while n:
            # Get the least significant digit of n; this will be the most significant digit of r in the first iteration,
            # the second most in the next iteration, and so on.
            last = n % 10

            if r == 0:
                # When r === 0, just make last digit the most significant digit.
                r = last
            else:
                # Otherwise shift r to the left by 10, then add the last digit we got from n.
                r = r * 10 + last

            n = n // 10

        value = sign * r
        return value if min_value < value < max_value else 0
