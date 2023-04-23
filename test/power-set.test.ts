function powerset<T>(xs: Array<T>): Array<Array<T>> {
  if (xs.length === 0) {
    return [[]];
  }

  const head = xs[0];
  const tail = xs.slice(1);
  const ps = powerset(tail);
  return ps.map(p => [...[head], ...p]);
}

describe('power set', () => {
  test('power set', async () => {
    expect(powerset([])).toMatchSnapshot();
    expect(powerset([1])).toMatchSnapshot();
    expect(powerset([1, 2])).toMatchSnapshot();
    expect(powerset([1, 2, 3])).toMatchSnapshot();
  });
});
