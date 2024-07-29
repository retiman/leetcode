// DIFFICULTY: Medium
//
// Given an integer array nums, return the number of triplets chosen from the array that can make triangles if we take
// them as side lengths of a triangle.
//
// See https://leetcode.com/problems/valid-triangle-number/
describe('valid triangle number', () => {
  // To form a triangle, 3 numbers have to satisfy the inequalities:
  //
  // a + b > c
  // a + c > b
  // b + c > a
  //
  // The most straightforward approach is to sort the numbers and use the two pointer technique to find triples.
  function triangleNumber(xs: number[]): number {
    if (xs.length <= 2) {
      return 0;
    }

    // Once all elements are sorted, we know that if i < j < k, then xs[i] <= xs[j] <= xs[k].  Let a = xs[i], b = xs[j],
    // and c = xs[k].  We know that a <= b <= c.
    //
    // If we find that a + b > c, then we have found a triplet.  This is because:
    //
    // a + c > b, since c > b.
    // b + c > a, since c > a.
    //
    // Once we find a triplet, we know that all elements between the left and right pointer are valid.
    xs.sort((a, b) => a - b);

    let result = 0;
    for (let i = xs.length - 1; i >= 0; i--) {
      // Loop backwards to find our c, which we'll check if it is greater than a + b.
      const c = xs[i];

      // Start at opposite ends of the array, [a, ...., b, c], and let a and b close in on each other to find a valid
      // triplet.  Starting this way lets us adjust a and b in the right directions to account for c.
      let left = 0;
      let right = i - 1;
      while (left < right) {
        const a = xs[left];
        const b = xs[right];

        // We have found a triplet; all elements between left and right can form a triplet.
        if (a + b > c) {
          result += right - left;

          // Since c is large compared to a + b, advance the right pointer and make c smaller to find more triplets.
          right--;
        } else {
          // Since c is small compared to a + b, advance the left pointer and make c bigger to find more triplets.
          left++;
        }
      }
    }

    return result;
  }

  test('valid triangle number - test case 1', async () => {
    expect(triangleNumber([2, 2, 3, 4])).toBe(3);
  });
});
