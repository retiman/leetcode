// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to
// target.
//
// You may assume that each input would have exactly one solution, and you may not use the same element twice.
//
// You can return the answer in any order.
//
// See https://leetcode.com/problems/two-sum
describe('two sum', () => {
  function find(xs: number[], target: number) {
    for (let i = 0; i < xs.length; i += 1) {
      for (let j = i + 1; j < xs.length; j += 1) {
        if (xs[i] + xs[j] === target) {
          return [i, j];
        }
      }
    }
  }

  function findFaster(xs: number[], target: number) {
    // Do the same as before but use a hashmap to keep track of values we've already seen.
    const m = new Map<number, number>();
    for (let i = 0; i < xs.length; i += 1) {
      const x = xs[i];
      const y = target - x;
      // If our map has the other value that would make up the target, we can return it immediately.
      if (m.has(y)) {
        return [i, m.get(y)];
      }

      // Otherwise, loop through the list as usual.
      for (let j = i + 1; j < xs.length; j += 1) {
        const y = xs[j];
        m.set(y, j);

        if (x + y === target) {
          return [i, j];
        }
      }
    }
  }

  test('run', async () => {
    expect(find([2, 7, 11, 15], 9)).toStrictEqual([0, 1]);
    expect(find([3, 2, 4], 6)).toStrictEqual([1, 2]);
    expect(find([3, 3], 6)).toStrictEqual([0, 1]);
  });

  test('run faster', async () => {
    expect(findFaster([2, 7, 11, 15], 9)).toStrictEqual([0, 1]);
    expect(findFaster([3, 2, 4], 6)).toStrictEqual([1, 2]);
    expect(findFaster([3, 3], 6)).toStrictEqual([0, 1]);
  });
});
