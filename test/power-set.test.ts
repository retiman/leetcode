describe('power set', () => {
  function __ps(xs: Set<number>): Set<Set<number>> {
    if (xs.size === 0) {
      return new Set(new Set());
    }

    // Find the first element of xs and call it x; remove it from the list.
    const x = xs.values().next().value;

    // Generate all subsets without x.
    const rest = new Set(xs);
    rest.delete(x);

    const excluded: Set<Set<number>> = __ps(rest);

    // Add x to all of the subsets from above.
    const included: Set<Set<number>> = new Set();
    excluded.forEach(ex => {
      const rest = new Set(ex);
      rest.add(x);

      included.add(rest);
    });

    // The subsets with x and the subsets without x constitute the power set.
    return new Set([...excluded, ...included]);
  }

  function ps(xs: Array<number>) {
    return __ps(new Set(xs));
  }

  test('run', async () => {
    expect(ps([])).toMatchSnapshot();
    expect(ps([1])).toMatchSnapshot();
  });
});
