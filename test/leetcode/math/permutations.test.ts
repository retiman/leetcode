// DIFFICULTY: Medium
//
// Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.
//
// See https://leetcode.com/problems/permutations
describe('permutations', () => {
  // The general strategy is to split the list into a head and a tail.  Generate all the permutations of the list
  // without the head element, then put the head in front of each of the generated permutations.  Do this recursively
  // for each element in the list will give all permutations.
  function permute(xs: number[]): number[][] {
    if (xs.length === 0) {
      return [[]];
    }

    if (xs.length === 1) {
      return [xs];
    }

    const result = [];

    for (let i = 0; i < xs.length; i += 1) {
      // Get the ith element; we will remove this element from the array, and generate permutations without this
      // element.
      const x = xs[i];

      // Generates all permutations without the ith element.
      const without = [...xs.slice(0, i), ...xs.slice(i + 1, xs.length)];
      const ps = permute(without);

      // For each of the permutations, put the ith element in front of the permutations, to get all possible
      // permutations.
      ps.forEach(p => p.unshift(x));
      result.push(...ps);
    }

    return result;
  }

  test('test case null', async () => {
    expect(permute([])).toStrictEqual([[]]);
  });

  test('test case 1', async () => {
    expect(permute([1, 2, 3])).toMatchSnapshot();
  });

  test('test case 2', async () => {
    expect(permute([0, 1])).toMatchSnapshot();
  });

  test('test case 2', async () => {
    expect(permute([1])).toStrictEqual([[1]]);
  });
});
