describe('power set', () => {
  function psInternal(xs: Set<number>): Set<Set<number>> {
    if (xs.size === 0) {
      // Note that new Set(new Set()) gives you a set with zero elements, because the constructor takes all elements of
      // the first argument and adds them to the set.  So you actually want to construct a new iterable based on the
      // empty set.
      return new Set([new Set()]);
    }

    // Find the first element of xs and call it x; remove it from the list.
    const x = xs.values().next().value;

    // Generate all subsets without x.
    const rest = new Set(xs);
    rest.delete(x);

    const excluded: Set<Set<number>> = psInternal(rest);

    // Add x to all of the subsets from above.
    const included = new Set<Set<number>>();
    excluded.forEach(ex => {
      const set = new Set(ex);
      set.add(x);

      included.add(set);
    });

    // The subsets with x and the subsets without x constitute the power set.
    return new Set([...excluded, ...included]);
  }

  function ps(xs: number[]) {
    return psInternal(new Set(xs));
  }

  test('run', async () => {
    expect(ps([])).toMatchSnapshot();
    expect(ps([1])).toMatchSnapshot();
    expect(ps([1, 2])).toMatchSnapshot();
    expect(ps([1, 2, 3])).toMatchSnapshot();
  });
});
