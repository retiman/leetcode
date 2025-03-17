# DIFFICULTY: MEDIUM
# ------------------
#
# Given an array of integers called nums, you can perform any of the following operation while nums contains at least
# 2 elements:
#
# - Choose the first two elements of nums and delete them.
# - Choose the last two elements of nums and delete them.
# - Choose the first and the last elements of nums and delete them.
#
# The score of the operation is the sum of the deleted elements.
#
# Your task is to find the maximum number of operations that can be performed, such that all operations have the same
# score.
#
# Return the maximum number of operations possible that satisfy the condition mentioned above.
#
# See https://leetcode.com/problems/maximum-number-of-operations-with-the-same-score-ii
class Solution:
    def maxOperations(self, nums: list[int]) -> int:
        """
        SOLUTION
        --------

        The range of possible scores is determined by applying the operation once.  Subsequent operations must produce
        the same score, so there are only three possible operations.  For each operation, we should apply them, then
        follow paths of operations that result in the same score until the array is exhausted.

        We COULD use the sliding window technique by applying each operation and then only following the operation paths
        that have the same score as the one we are considering.  However, this would only work if at each choice of
        three operations, the scores are unique.  If there are two or more choices with the same score, then we need to
        explore multiple operation paths at once.

        To explore multiple operation paths at once, we'll need to use a backtracking approach.

        COMPLEXITY
        ----------

        Time complexity is O(3^n) because we are exploring all possible operations.

        Space complexity is O(n) because we are storing the operations in stack frames.
        """
        if len(nums) < 2:
            return 0

        # These are the range of possible scores we can have as we truncate the array.
        scores: set[int] = set()
        scores.add(nums[0] + nums[1])
        scores.add(nums[0] + nums[-1])
        scores.add(nums[-1] + nums[-2])

        # There is an opportunity for optimization when using backtracking.  We can maintain a memoization table to keep
        # track of previously computed values.
        memo: dict[tuple[int, int, int], int] = {}

        # Adapt the sliding window approach so we can explore multiple paths at once by backtracking.
        def backtrack(score: int, left: int, right: int, paths: int) -> int:
            if left >= right:
                return paths

            # Check the memoization table to see if we've previously computed this value.
            if (score, left, right) in memo:
                return memo[(score, left, right)]

            # This is the local max count, after exploring all possible paths.
            local = paths

            # Check if the first 2 elements are equal to the score, and if the left and right indices are in range.
            #
            # To be in range, the array must at least look like this: [left, left + 1/right].
            if left + 1 <= right and nums[left] + nums[left + 1] == score:
                local = max(local, backtrack(score, left + 2, right, paths + 1))

            # Check if the last 2 elements are equal to the score, and if the left and right indices are in range.
            #
            # To be in range, the array must at least look like this: [left/right - 1, right]
            if left <= right - 1 and nums[right] + nums[right - 1] == score:
                local = max(local, backtrack(score, left, right - 2, paths + 1))

            # Check if the first and last elements are equal to the score, and if the left and right indices are in
            # range.
            #
            # To be in range, the array must at least look like this: [left, right]
            if left < right and nums[left] + nums[right] == score:
                local = max(local, backtrack(score, left + 1, right - 1, paths + 1))

            # Update the memoization table.
            memo[(score, left, right)] = local
            return local

        # For each score, check out how many times we can keep applying operations.
        xs = list(scores)
        maxes = [backtrack(x, 0, len(nums) - 1, 0) for x in xs]
        return max(maxes)
