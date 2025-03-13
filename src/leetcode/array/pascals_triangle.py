# DIFFICULTY: MEDIUM
#
# Given an integer numRows, return the first numRows of Pascal's triangle.
#
# In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:
#
# See https://leetcode.com/problems/pascals-triangle
class Solution:
    def generate(self, numRows: int) -> list[list[int]]:
        """
        SOLUTION:

        A simple straightforward algorithm works.

        COMPLEXITY
        ----------

        Time complexity is O(n).

        Space complexity is O(n).
        """
        triangle: list[list[int]] = []

        for i in range(numRows):
            # Special case the first row
            if i == 0:
                triangle.append([1])
                continue

            # The first and last elements of this row have value 1.
            current = [1]

            # The middle elements gotten by summing pairs of the previous row.
            previous = triangle[i - 1]
            if len(previous) > 1:
                for j in range(1, len(previous)):
                    current.append(previous[j] + previous[j - 1])

            # The first and last elements of this row have value 1.
            current.append(1)

            # Push the constructed row onto the triangle.
            triangle.append(current)

        return triangle
