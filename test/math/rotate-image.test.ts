import { rotate } from '../../src/math/rotate-image';

describe('rotate image', () => {
  test('rotate image - test case 1', async () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];

    rotate(matrix);

    expect(matrix).toStrictEqual([
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3]
    ]);
  });
});
