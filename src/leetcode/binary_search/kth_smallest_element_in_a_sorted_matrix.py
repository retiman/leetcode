# DIFFICULTY: MEDIUM
#
# Given an n x n matrix where each of the rows and columns is sorted in ascending order, return the kth smallest
# element in the matrix.
#
# Note that it is the kth smallest element in the sorted order, not the kth distinct element.
#
# You must find a solution with a memory complexity better than O(n^2).
#
# See https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix
class Solution:
    def kthSmallest(self, matrix: list[list[int]], k: int) -> int:
        """
        SOLUTION:

        We can't flatten the list because that would take O(n^2) memory.

        Use binary search to narrow down where the kth smallest element is.  Here, the left value is the smallest
        element, and the right value is the largest element.

        We can use the mid element to tell us how close or far we are from the kth smallest element.  The matrix is
        sorted, so for any mid === matrix[i][j] we can figure out how many elements are less than or equal to mid.

        COMPLEXITY:

        Time complexity is O(n log m).  We are using binary search on a range between the smallest and largest elements
        in the matrix, call it m.  We will do O(log m) iterations, but in each iteration, we do have to count how many
        elements are less than or equal to the mid target.

        The countLessThanOrEqualTo() function takes at most n steps (where n is the number of rows/columns in the
        matrix). Since this is done at every single iteration, the total time is O(n log m).

        Space complexity is O(1).
        """

        def countLessThanOrEqualTo(matrix: list[list[int]], target: int) -> int:
            # We can leverage the properties of the matrix to count how many elements are less than or equal to the
            # target.  Use a modified two pointer technique to count up elements.
            count = 0

            # Start at the bottom left corner of the matrix:
            #
            # - - - -
            # - - - -
            # - - - -
            # x - - -
            #
            # If the value is less than or equal to the target, then all elements from all previous rows are also less
            # than our target (since the matrix is sorted).  To count up that specific column, add (row + 1) to the
            # count (the rows are 0 indexed, but the count is not, so we add 1).
            row = len(matrix) - 1
            column = 0
            while row >= 0 and column < len(matrix):
                # Add up all the elements in the column.  That is:
                #
                # x - - -
                # x - - -
                # x - - -
                # x - - -
                #
                # All x's get added to the count, which means all elements in the column get added to the count.
                # Because the matrix is sorted, all elements in the above column MUST be less than or equal to the
                # target.
                #
                # Stop when we reach column === matrix.length - 1.
                if matrix[row][column] <= target:
                    count += row + 1
                    column += 1
                # If the element is greater than the target, we can move up a row and try again:
                #
                # x - - -
                # x - - -
                # x - - -
                # - - - -
                #
                # Stop when we reach row === 0.
                else:
                    row -= 1

            return count

        # Use insertion sort binary search to find exactly where the kth smallest element is; don't use the standard
        # binary search algorithm because we're not looking for an exact value.
        left = matrix[0][0]
        right = matrix[len(matrix) - 1][len(matrix) - 1]
        while left < right:
            mid = (left + right) // 2
            count = countLessThanOrEqualTo(matrix, mid)

            if count < k:
                left = mid + 1
            else:
                right = mid

        return left
