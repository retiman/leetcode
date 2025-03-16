# DIFFICULTY: MEDIUM
#
# An integer has sequential digits if and only if each digit in the number is one more than the previous digit.
#
# Return a sorted list of all the integers in the range [low, high] inclusive that have sequential digits.
#
# See https://leetcode.com/problems/sequential-digits
class Solution:
    def sequentialDigits(self, low: int, high: int) -> list[int]:
        """
        SOLUTION
        --------

        Rather than take a list from low to high and filtering out the numbers that match our criteria, it will be much
        faster to generate a list of numbers with this quality with the correct number of digits, then filter out by low
        and high ranges.

        COMPLEXITY
        ----------

        Time complexity is O(1) because the number of digits in an integer is fixed.  Or it's O(m) where m is the number
        of digits.

        Space complexity is O(1).
        """
        results: list[int] = []

        # Sequential digits end at 9, so the largest sequential number you can have is 123456789.  Start generating them
        # at i = 1.  We'll handle 0 in a special case.
        for i in range(1, 10):
            # Set the value to be xxxi, and the next digit following xxxi to be i + 1.  We will append i + 1 to the end
            # of this number.
            value = i
            next_digit = i + 1

            while next_digit <= 9 and value <= high:
                # Shift the current number's digits over to the left, leaving a 0 in the one's place.
                value *= 10

                # Add the next digit to the one's place.
                value += next_digit
                next_digit += 1

                # If it's within bounds, add it to the array.
                if low <= value <= high:
                    results.append(value)

            # Handle the special case where low is 0.
            if low == 0:
                results.append(0)

        return sorted(results)
