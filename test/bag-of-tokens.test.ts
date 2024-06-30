// DIFFICULTY: Medium
//
// You start with an initial power of `power`, an initial score of 0, and a bag of tokens given as an integer array
// tokens, where each tokens[i] denotes the value of tokeni.
//
// Your goal is to maximize the total score by strategically playing these tokens. In one move, you can play an unplayed
// token in one of the two ways (but not both for the same token):
//
// Face-up: If your current power is at least tokens[i], you may play tokeni, losing tokens[i] power and gaining 1
//          score.
// Face-down: If your current score is at least 1, you may play tokeni, gaining tokens[i] power and losing 1 score.
//
// Return the maximum possible score you can achieve after playing any number of tokens.
//
// See https://leetcode.com/problems/bag-of-tokens/
describe('bag of tokens', () => {
  // You basically are allowed to gain power at the cost of score, or gain score at the cost of power.  You want to
  // maximize the score.  The problem does not tell you this, but:
  //
  // 1. The tokens are given to you as an array, but you may play them in any order.
  // 2. You may opt to not play any tokens at all.
  //
  // Because score is always gained one point at a time, but power can be unlimited, we'll want to spend the least
  // amount of power for score (that is make the smallest power tokens face up), while also sacrificing score for the
  // highest power tokens.
  //
  // To start with, we'll try to play the highest power tokens face down first, then use that power to score as much as
  // we can with the lower power tokens.
  function bagOfTokensScore(tokens: number[], power: number): number {
    // First sort the tokens, so we can consume tokens from the ends to maximize score.
    tokens.sort((a, b) => a - b);

    // Use the two pointers technique to figure out if we should consume tokens from the left to build power, or
    // consume tokens from the right to build score.
    let left = 0;
    let right = tokens.length - 1;
    let score = 0;
    let max = 0;

    // Choosing left < right will miss out on a token possibly.
    while (left <= right) {
      // Since we are attempting to maximize score, let's try to eat the smaller tokens first to build score.
      if (power >= tokens[left]) {
        power -= tokens[left];
        score++;
        left++;

        // Because we are running through every possible combination of token placing, we may have achieved max score
        // already, but continue to play tokens.  The problem asks for the max possible score, so record it here.
        max = Math.max(score, max);
        continue;
      }

      // Otherwise, let's try to eat a big token to build power if we can.
      if (score > 0) {
        power += tokens[right];
        score--;
        right--;
        continue;
      }

      // If we've reached this point, we don't have the score to build power.  We also can't eat any tokens to build
      // score, so we have to stop.
      break;
    }

    return max;
  }

  test('test case 1', async () => {
    expect(bagOfTokensScore([100], 50)).toBe(0);
  });

  test('test case 2', async () => {
    expect(bagOfTokensScore([200, 100], 150)).toBe(1);
  });

  test('test case 3', async () => {
    expect(bagOfTokensScore([100, 200, 300, 400], 200)).toBe(2);
  });
});
