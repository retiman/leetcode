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

  test('run', async () => {
    expect(find([2, 7, 11, 15], 9)).toStrictEqual([0, 1]);
    expect(find([3, 2, 4], 6)).toStrictEqual([1, 2]);
    expect(find([3, 3], 6)).toStrictEqual([0, 1]);
  });
});
