describe('coin sum', () => {
  function sum(coins: Array<number>, target: number) {
    // Fills an array of X size with 0's.
    const ways = new Array(target).fill(0);

    ways.unshift(1);

    coins.forEach(coin => {
      for (let i = coin; i <= target; i += 1) {
        ways[i] += ways[i - coin];
      }
    });

    return ways[target];
  }

  test('run', async () => {
    expect(sum([1, 2, 5, 10, 20, 50, 100, 200], 200)).toBe(73682);
  });
});
