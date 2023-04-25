describe('permutations', () => {
  function permutations(xs: Array<number>): Array<Array<number>> {
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
      const ps = permutations(without);

      // For each of the permutations, put the ith element in front of the permutations, to get all possible
      // permutations.
      ps.forEach(p => p.unshift(x));
      result.push(...ps);
    }

    return result;
  }

  test('run trivial', async () => {
    expect(permutations([])).toStrictEqual([[]]);
    expect(permutations([1])).toStrictEqual([[1]]);
  });

  test('run 1, 2, 3, 4', async () => {
    const ps = permutations([1, 2, 3, 4]);
    const length = 4 * 3 * 2 * 1;

    expect(ps.length).toBe(length);
    expect(ps).toMatchSnapshot();
  });
});
