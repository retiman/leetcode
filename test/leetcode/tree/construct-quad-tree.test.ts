import { construct } from '../../src/tree/construct-quad-tree';

describe('construct quad tree', () => {
  test('quad tree - test case 1', async () => {
    const grid = [
      [0, 1],
      [1, 0]
    ];

    expect(construct(grid)).toMatchSnapshot();
  });

  test('quad tree - test case 2', async () => {
    const grid = [
      [1, 1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0]
    ];

    expect(construct(grid)).toMatchSnapshot();
  });
});
