describe('number of islands', () => {
  test('number of islands - test case 1', async () => {
    const grid = [
      ['1', '1', '1', '1', '0'],
      ['1', '1', '0', '1', '0'],
      ['1', '1', '0', '0', '0'],
      ['0', '0', '0', '0', '0']
    ];

    expect(numIslands(grid)).toBe(1);
  });
});
