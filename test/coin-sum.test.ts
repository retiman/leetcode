describe('coin sum', () => {
  function sum(coins: Array<number>, target: number) {
    // Fills an array of X+1 size with 0's; each index will represent a target.  We need an extra index because the
    // index is the target, so we need to account for ways[200] is the number of ways to make 200, and ways[0] is the
    // number of ways to make 0.  This is all because arrays are 0 indexed.
    const ways = new Array(target + 1).fill(0);

    // With a target of 0, there's only one way to do this: with no coins.
    ways[0] = 1;

    coins.forEach(coin => {
      for (let j = coin; j <= target; j += 1) {
        ways[j] += ways[j - coin];
      }
    });

    console.log(ways);
    return ways[target];
  }

  test('run', async () => {
    expect(sum([1, 2, 5, 10, 20, 50, 100, 200], 200)).toBe(73682);
  });
});
