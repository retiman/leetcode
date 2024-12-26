describe('minimize deviation in array', () => {
  test('minimum deviation - test case 1', async () => {
    const xs = [1, 2, 3, 4];

    expect(minimumDeviation(xs)).toBe(1);
  });

  test('minimum deviation - test case 2', async () => {
    const xs = [4, 1, 5, 20, 3];

    expect(minimumDeviation(xs)).toBe(3);
  });

  test('minimum deviation - test case 3', async () => {
    const xs = [2, 10, 8];

    expect(minimumDeviation(xs)).toBe(3);
  });
});
