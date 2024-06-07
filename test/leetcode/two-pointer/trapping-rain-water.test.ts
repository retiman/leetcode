// DIFFICULTY: Hard
//
// Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water
// it can trap after raining.
//
// See https://leetcode.com/problems/trapping-rain-water/
describe('trapping rain water', () => {
  // Note that for this question, the leftmost element of the elevation map doesn't trap any water, because there is no
  // land/bar to the left of the leftmost element.
  //
  // Similarly, for the rightmost element, any depression of the land/bar doesn't trap any water because there isn't
  // any elevation to the right of the rightmost element.
  //
  // To solve this we can use the two pointers technique to compute trapped rainwater on a pointer by pointer basis,
  // advancing the pointers
  function trap(elevationMap: number[]): number {
    // The difference between the lowest height and the smaller of the max height from the left and right sides
    // contributes to that many units of trapped rainwater.
    //
    // For example, a current elevation of zero with a max elevation of 4 and 6 on the left and right sides respectively
    // will hold 4 units of trapped rainwater.
    let trapped = 0;

    // Track the maximum height on the left side and right side, based on where our pointers land.  The smaller of these
    // two values will be the height we will use to compute trapped rainwater (since any rainwater over the smaller
    // value will spill out).
    let lmax = 0;
    let rmax = 0;
    let max = 0;

    // Use the two pointers technique to compute the trapped rainwater.
    let left = 0;
    let right = elevationMap.length - 1;
    while (left < right) {
      // Update the left and right max values, then compute the smaller of these two values to figure out the amount
      // of rainwater we can actually trap.
      lmax = Math.max(lmax, elevationMap[left]);
      rmax = Math.max(rmax, elevationMap[right]);

      // This is the max amount we can trap with an elevation of zero.  We compute the elevation next to figure out how
      // much is really trapped.
      max = Math.min(lmax, rmax);

      // Compute the trapped rainwater from one of the pointers, then advance it.
      //
      // Choose to advance the pointer associated with the smaller height inward, so that we have the opportunity
      // to move to a higher elevation and trap more water.
      if (elevationMap[left] < elevationMap[right]) {
        const elevation = elevationMap[left];
        trapped += max - elevation;
        left++;
      } else {
        const elevation = elevationMap[right];
        trapped += max - elevation;
        right--;
      }
    }

    return trapped;
  }

  test('run', async () => {
    expect(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toBe(6);
    expect(trap([0, 1, 1, 0])).toBe(0);
    expect(trap([0, 1, 0, 1, 0])).toBe(1);
  });
});
