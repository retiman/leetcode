# DIFFICULTY: MEDIUM
# ------------------
#
# You start with an initial power of `power`, an initial score of 0, and a bag of tokens given as an integer array
# tokens, where each tokens[i] denotes the value of tokeni.
#
# Your goal is to maximize the total score by strategically playing these tokens. In one move, you can play an unplayed
# token in one of the two ways (but not both for the same token):
#
# Face-up: If your current power is at least tokens[i], you may play tokeni, losing tokens[i] power and gaining 1
#          score.
# Face-down: If your current score is at least 1, you may play tokeni, gaining tokens[i] power and losing 1 score.
#
# Return the maximum possible score you can achieve after playing any number of tokens.
#
# See https://leetcode.com/problems/bag-of-tokens
class Solution:
    def bagOfTokensScore(self, tokens: list[int], power: int) -> int:
        """
        SOLUTION
        --------

        You basically are allowed to gain power at the cost of score, or gain score at the cost of power.  You want to
        maximize the score.  The problem does not tell you this, but:

        1. You may view all the tokens in the bag before making any plays.
        1. You may play tokens in the bag in any order.
        2. You may opt to not play any tokens at all.

        Because score is always gained one point at a time, but power can be be any value, we'll want to spend the least
        amount of power for score.  That is, sacrifice smaller power tokens face up for score, play higher power tokens
        for their raw (power) value.

        COMPLEXITY
        ----------

        Time complexity is dominated by sorting, making it O(n log n).

        Space complexity is O(1).
        """
        # Sort the tokens so we can take power from the right end (higher power), and sacrifice tokens for score from
        # the left end.
        tokens.sort()

        # This problem is well suited for using the two pointers technique, iterating through the array from both
        # directions.
        left = 0
        right = len(tokens) - 1
        score = 0
        max_score = 0

        while left <= right:
            # If we can, try to eat the smaller power tokens to build score until we run out of power.
            if power >= tokens[left]:
                power -= tokens[left]
                score += 1
                left += 1
                # It can be the case that while running through the bag of tokens, we've achieved maximum score possible.
                # However, we should continue going through the bag just to check.
                max_score = max(max_score, score)

            # If we can't eat a smaller token, let's eat a bigger token to build power so we can eat more later.
            elif score > 0:
                power += tokens[right]
                score -= 1
                right -= 1

            # If we cannot eat any tokens, then simply quit.
            else:
                break

        return max_score
